import { useSummoners } from './useSummoners'
import useSWRInfinite from 'swr/infinite'
import { useEffect, useMemo, useState } from 'react'
import { LeagueMatch, PlayerStats } from '@/types'
import { findSummonerByName } from '@/utils/helpers'

// const getKey = (pageIndex, previousPageData) => {
//   if (previousPageData && !previousPageData.length) return null // reached the end
//   return `/api/matchHistory/name/${name}?page=${pageIndex}&limit=10` // SWR key
// }

// const fetcher = async (name: string, cursor?: number) =>
//   await fetch(`/api/matchHistory/name/${name}${cursor ? `?cursor=${cursor}` : ''}`).then((res) => res.json())

const fetcher = async (url: string) => await fetch(url).then((res) => res.json())

export const useGetMatchHistory = (name: string) => {
  const { summoners } = useSummoners()
  const summoner = findSummonerByName(summoners, name)

  const { data, isLoading, size, setSize } = useSWRInfinite((pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.data) return null
    if (pageIndex === 0) return `/api/matchHistory/name/${name}`
    const cursor = previousPageData?.data[previousPageData?.data.length]?.id
    console.log('cursor', cursor)
    return `/api/matchHistory/name/${name}?cursor=${cursor}}`
  }, fetcher)

  const [wins, setWins] = useState<any[] | null>()
  const [winRate, setWinRate] = useState<number>()
  const [mostPlayed, setMostPlayed] = useState<Map<any, any> | null>(null)

  const matchHistory = useMemo(() => data?.flatMap((i) => i) ?? [], [data])

  useEffect(() => {
    if (matchHistory?.length < 1 || !summoner?.puuid) return

    const playerStats = matchHistory
      .filter((match: LeagueMatch) => match?.info !== undefined || match?.info == null)
      .map((match: LeagueMatch) => match?.info?.participants.find((player: any) => player?.puuid === summoner?.puuid))

    const wins = playerStats.filter((player: PlayerStats) => player?.win) as any[] | null
    if (wins) {
      setWins(wins)
      setWinRate(Math.round((wins.length / playerStats.length) * 100))
    }

    const champions = playerStats.map((player: PlayerStats) => player?.championName)
    const champsMap = new Map()

    champions.forEach((champ: any) => {
      if (champsMap.has(champ)) {
        champsMap.set(champ, champsMap.get(champ) + 1)
      } else {
        champsMap.set(champ, 1)
      }
    })

    const percentage = (num: number, total: number) => (num / total) * 100

    const mostPlayed = new Map()
    const sortedChampsMap = new Map([...(champsMap.entries() as any)].sort((a, b) => b[1] - a[1])) as any

    const setMap = (map: Map<any, any>, arr: Map<any, any>, i: number) => {
      map.set(
        [...arr.keys()][i],
        Math.round(
          percentage(
            [...arr.values()][i],
            [...arr.values()].reduce((a, b) => a + b)
          )
        )
      )
    }

    ;[...new Array(3)]
      .map(() => 0)
      .forEach((_, i) => {
        setMap(mostPlayed, sortedChampsMap, i)
      })

    setMostPlayed(mostPlayed)
  }, [matchHistory, summoner?.puuid])

  return {
    matchHistory,
    summoner,
    isLoading,
    wins,
    winRate,
    mostPlayed,
    size,
    setSize
  }
}
