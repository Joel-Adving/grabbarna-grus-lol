import useSWR, { useSWRConfig } from 'swr'
import { useSummoners } from './useSummoners'
import { useEffect, useState } from 'react'
import { LeagueMatch, PlayerStats } from '@/types'
import { findSummonerByName } from '@/utils/helpers'
import { useSearchParams } from 'next/navigation'

const fetcher = async (name: string, fetchAll: boolean) =>
  await fetch(`/api/matchHistory/name/${name}?fetchAll=${fetchAll}`).then((res) => res.json())

export const useGetMatchHistory = (name: string) => {
  const [wins, setWins] = useState<any[] | null>()
  const [winRate, setWinRate] = useState<number>()
  const [mostPlayed, setMostPlayed] = useState<Map<any, any> | null>(null)

  const { summoners } = useSummoners()
  const summoner = findSummonerByName(summoners, name)
  const [fetchAll, setFetchAll] = useState(false)

  const { mutate } = useSWRConfig()
  const { data: matchHistory, isLoading, isValidating } = useSWR(`matchHistory/${name}`, () => fetcher(name, fetchAll))

  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams?.get('show') === 'all') {
      setFetchAll(true)
    }
  }, [searchParams])

  useEffect(() => {
    if (!matchHistory || matchHistory?.length > 20) return
    mutate(`matchHistory/${name}`)
  }, [fetchAll, matchHistory, mutate, name])

  useEffect(() => {
    if (!matchHistory || matchHistory?.length < 1 || !summoner?.puuid) return

    const playerStats = matchHistory
      .filter((match: LeagueMatch) => match?.info !== undefined || match?.info == null)
      .map((match: LeagueMatch) => match?.info?.participants.find((player: any) => player?.puuid === summoner?.puuid))

    const _wins = playerStats.filter((player: PlayerStats) => player?.win) as any[] | null
    if (_wins) {
      setWins(_wins)
      setWinRate(Math.round((_wins.length / playerStats.length) * 100))
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
    isValidating,
    wins,
    winRate,
    mostPlayed,
    fetchAll,
    setFetchAll
  }
}
