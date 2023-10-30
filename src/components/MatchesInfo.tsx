'use client'

import { useFilterAndSortMatches } from '@/hooks/useFilterAndSortMatches'
import { useGetMatchHistory } from '@/hooks/useGetMatchHistory'
import { LeagueMatch, Summoner } from '@/types'

export default function MatchesInfo({ matchHistory, summoner }: { matchHistory: LeagueMatch[]; summoner: Summoner }) {
  const { matchHistory: _matchHistory, winRate, wins } = useGetMatchHistory(summoner, matchHistory)
  const { sortedMatchHistory } = useFilterAndSortMatches(_matchHistory, summoner)

  if (!winRate || !wins || !sortedMatchHistory) {
    return null
  }

  return (
    <>
      <p className="text-text-highlight">{sortedMatchHistory.length}</p>
      <h2 className="text-text-highlight">GAMES</h2>
      <p>/</p>
      <p className="text-sm">WINRATE</p>
      <p className={`${winRate >= 50 ? 'text-victory' : 'text-defeat'}`}>{winRate}%</p>
      <p>/</p>
      <div className="flex">
        <h3 className="text-victory ">{wins.length}</h3>
        <span className="mx-1">/</span>
        <h3 className=" text-defeat">{sortedMatchHistory.length - wins.length}</h3>
      </div>
    </>
  )
}
