import { useSummoners } from './useSummoners'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { LeagueMatch, PlayerStats } from '@/types'

const fetcher = async (name: string) => await fetch(`/api/matchHistory/name/${name}`).then((res) => res.json())

export const useGetMatchHistory = (name: string) => {
  const { summoners } = useSummoners()
  const summoner = summoners?.find((summoner: any) => summoner.name === name)
  const { data: matchHistory, isLoading } = useSWR(name ? `matchHistory/${name}` : null, () => fetcher(name))

  const [wins, setWins] = useState<any[] | null>()
  const [winRate, setWinRate] = useState<number>()
  const [mostPlayed, setMostPlayed] = useState<Map<any, any> | null>(null)

  useEffect(() => {
    if (!matchHistory || !summoner?.puuid) return

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
    mostPlayed
  }
}
