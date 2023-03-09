import { prisma } from '@/libs/prisma'
import { sleep } from '../helpers'
import { updateMatchHistory } from '../server/updateMatches'
import { matchHistory, matches, summoner } from './riotApi'

export async function addRecentMatches(name: string) {
  const resSummoner: any = await summoner(name)
  const resMatchHistory: any = await matchHistory(resSummoner.puuid)

  await sleep(1100)

  const matchesInfo = await matches(resMatchHistory)

  const currentRecentMatches = await prisma.match.findMany({
    take: 20,
    where: {
      summoners: {
        some: {
          name: name
        }
      }
    },
    orderBy: {
      date: 'desc'
    }
  })

  const newMatches = matchesInfo.filter((match: any) => {
    for (let currentMatch of currentRecentMatches) {
      if (currentMatch.matchId === match.metadata.matchId) {
        return false
      }
    }
    return true
  })

  if (newMatches.length > 0) {
    updateMatchHistory(newMatches, name)
  }
}
