import useSWR, { useSWRConfig } from 'swr'
import { useEffect, useMemo, useState } from 'react'
import { LeagueMatch, PlayerStats, Summoner } from '@/types'
import { useSearchParams } from 'next/navigation'
import { nextApi } from '@/services/nextApi'

export const useGetMatchHistory = (summoner: Summoner, serverSideMatchHistory: any) => {
  const { mutate } = useSWRConfig()
  const searchParams = useSearchParams()

  const [fetchAll, setFetchAll] = useState(false)

  const { data, isLoading, isValidating } = useSWR(fetchAll ? `matchHistory/${summoner.name}` : null, () => {
    return nextApi.getMatchHistory(summoner.name, fetchAll)
  })

  const matchHistory = useMemo(() => {
    if (serverSideMatchHistory && !fetchAll) {
      return serverSideMatchHistory
    } else if (data) {
      return data
    } else {
      return []
    }
  }, [data, fetchAll, serverSideMatchHistory])

  const playerStats = useMemo(
    () =>
      matchHistory
        .filter((match: LeagueMatch) => match?.info !== undefined || match?.info == null)
        .map((match: LeagueMatch) =>
          match?.info?.participants.find((player: any) => player?.puuid === summoner?.puuid)
        ),
    [matchHistory, summoner?.puuid]
  )

  useEffect(() => {
    if (searchParams?.get('show') === 'all') {
      setFetchAll(true)
    }
  }, [searchParams])

  useEffect(() => {
    if (!matchHistory || matchHistory?.length > 20) return
    mutate(`matchHistory/${summoner.name}`)
  }, [fetchAll, matchHistory, mutate, summoner.name])

  const wins = useMemo(() => {
    if (!matchHistory || matchHistory?.length < 1 || !summoner?.puuid) return
    return playerStats.filter((player: PlayerStats) => player?.win) as any[] | null
  }, [matchHistory, playerStats, summoner?.puuid])

  const winRate = useMemo(() => {
    if (!wins) return
    return Math.round((wins.length / playerStats.length) * 100)
  }, [playerStats, wins])

  const mostPlayed = useMemo(() => {
    if (!matchHistory || matchHistory?.length < 1 || !summoner?.puuid) {
      return
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

    return mostPlayed
  }, [matchHistory, playerStats, summoner?.puuid])

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
