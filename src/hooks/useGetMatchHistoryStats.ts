'use client'

import { useEffect, useState } from 'react'
import { percentages } from '../util/helpers'
import { LeagueMatch, PlayerStats } from '../util/types'
import { useGetMatchHistory } from './useGetMatchHistory'

export const useGetMatchHistoryStats = ({ params }: any) => {
  const [stats, setStats] = useState<any>(null)
  const { matchHistory, summoner } = useGetMatchHistory(params?.name)

  useEffect(() => {
    if (!matchHistory) return
    const playerStats = matchHistory
      .filter((match: LeagueMatch) => match?.info !== undefined || match?.info == null)
      .map((match: LeagueMatch) => match?.info?.participants.find((player: any) => player?.summonerId === summoner?.id))

    const wins = playerStats.filter((player: PlayerStats) => player?.win) as any[] | null
    const champions = playerStats.map((player: PlayerStats) => player?.championName)
    const recentChamps = Object.assign(
      // @ts-ignore
      ...Object.entries(percentages(champions))
        .sort(({ 1: a }: any, { 1: b }: any) => b - a)
        .slice(0, 3)
        .map(([k, v]) => ({ [k]: v }))
    )

    setStats({ wins, recentChamps })
  }, [matchHistory, summoner?.id])

  return { stats }
}
