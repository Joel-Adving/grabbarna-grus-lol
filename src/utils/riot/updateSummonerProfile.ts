import { prisma } from '@/lib/prisma'
import * as riotApi from './riotApi'

export async function updateSummonerProfile(name: string) {
  const summoner = await prisma.summoner.findFirst({ where: { name } })
  if (!summoner) return

  const summonerProfile = await riotApi.summoner(summoner.name)

  if (summonerProfile) {
    const { profileIconId, summonerLevel, revisionDate } = summonerProfile

    await prisma.summoner.update({
      where: {
        id: summoner.id
      },
      data: {
        profileIconId,
        summonerLevel,
        revisionDate
      }
    })
  }

  const rankedStats = await riotApi.rank(summoner.summonerId)

  if (rankedStats.length > 0) {
    rankedStats.forEach(async (stats: any) => {
      const rankedStatsExists = await prisma.rankedStats.findFirst({
        where: {
          summonerId: summoner.summonerId,
          queueType: stats.queueType
        }
      })

      if (rankedStatsExists) {
        await prisma.rankedStats.update({
          where: {
            id: rankedStatsExists.id
          },
          data: {
            ...stats
          }
        })
      } else {
        await prisma.rankedStats.create({
          data: {
            ...stats,
            summoner: {
              connect: {
                id: summoner.summonerId
              }
            }
          }
        })
      }
    })
  }
}
