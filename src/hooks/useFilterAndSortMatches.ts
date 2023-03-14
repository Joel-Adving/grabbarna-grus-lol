import { Summoner } from '@prisma/client'
import { useMemo, useState } from 'react'

export type SortBy =
  | 'date'
  | 'kills'
  | 'assists'
  | 'deaths'
  | 'gameLength'
  | 'championId'
  | 'win'
  | 'goldEarned'
  | 'pentaKills'
  | 'totalDamageDealt'
  | 'totalDamageDealtToChampions'
  | 'kda'
  | 'soloKills'
  | 'totalHeal'
  | 'totalMinionsKilled'
  | 'snowballsHit'
  | 'skillshotsDodged'
  | 'perfectGame'

const sortParticipants = (a: any, b: any, summoner: Summoner, key: SortBy) =>
  b.info.participants.find((p: any) => p.summonerId === summoner.summonerId)?.[key] -
  a.info.participants.find((p: any) => p.summonerId === summoner.summonerId)?.[key]

const sortChallenges = (a: any, b: any, summoner: Summoner, key: SortBy) =>
  b.info.participants.find((p: any) => p.summonerId === summoner.summonerId).challenges?.[key] -
  a.info.participants.find((p: any) => p.summonerId === summoner.summonerId).challenges?.[key]

export function useFilterAndSortMatches(matchHistory: any, summoner: Summoner) {
  const [sortBy, setSortBy] = useState<SortBy>('date')

  const sortedMatchHistory = useMemo(() => {
    if (!matchHistory) return null
    console.log(matchHistory)
    const sortedMatches = matchHistory.slice().sort((a: any, b: any) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'kills':
          return sortParticipants(a, b, summoner, 'kills')
        case 'deaths':
          return sortParticipants(a, b, summoner, 'deaths')
        case 'assists':
          return sortParticipants(a, b, summoner, 'assists')
        case 'gameLength':
          return b.info.gameDuration - a.info.gameDuration
        case 'championId':
          return sortParticipants(a, b, summoner, 'championId')
        case 'goldEarned':
          return sortParticipants(a, b, summoner, 'goldEarned')
        case 'pentaKills':
          return sortParticipants(a, b, summoner, 'pentaKills')
        case 'totalDamageDealt':
          return sortParticipants(a, b, summoner, 'totalDamageDealt')
        case 'totalDamageDealtToChampions':
          return sortParticipants(a, b, summoner, 'totalDamageDealtToChampions')
        case 'kda':
          return sortChallenges(a, b, summoner, 'kda')
        case 'soloKills':
          return sortChallenges(a, b, summoner, 'soloKills')
        case 'totalHeal':
          return sortParticipants(a, b, summoner, 'totalHeal')
        case 'totalMinionsKilled':
          return sortParticipants(a, b, summoner, 'totalMinionsKilled')
        case 'snowballsHit':
          return sortChallenges(a, b, summoner, 'snowballsHit')
        case 'skillshotsDodged':
          return sortChallenges(a, b, summoner, 'skillshotsDodged')
        case 'perfectGame':
          return sortChallenges(a, b, summoner, 'perfectGame')
        default:
          return 0
      }
    })

    return sortedMatches
  }, [matchHistory, sortBy, summoner])

  return { sortedMatchHistory, sortBy, setSortBy }
}
