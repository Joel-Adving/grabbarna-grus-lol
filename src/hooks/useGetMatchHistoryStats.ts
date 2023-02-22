import { useEffect, useState } from 'react'
import { percentages } from '../utils/helpers'
import { LeagueMatch, PlayerStats } from '../utils/types'

export const useGetMatchHistoryStats = (matchHistory: any, summoner: any) => {
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    if (!matchHistory || !summoner?.id) return

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
