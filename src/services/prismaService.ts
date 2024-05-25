import { prisma } from '@/lib/prisma'
import { sleep } from '@/utils/helpers'
import { riotApi } from './riotApi'
import { revalidatePath, revalidateTag } from 'next/cache'

async function addRecentMatches(name: string) {
  const resSummoner = await riotApi.getSummonerByName(name)
  const resMatchHistory = await riotApi.matchHistory(resSummoner.puuid)

  await sleep(1100)

  console.log({ resMatchHistory, resSummoner })

  const matchesInfo = await riotApi.matches(resMatchHistory)
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

  const newMatches = matchesInfo.filter((match) => {
    for (let currentMatch of currentRecentMatches) {
      if (currentMatch?.matchId === match?.metadata?.matchId) {
        return false
      }
    }
    return true
  })

  if (newMatches.length > 0) {
    updateMatchHistory(newMatches, name)
  }
}

async function updateSummonerProfile(name: string) {
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

  await updateRankedStats(summoner.summonerId)
}

async function updateRankedStats(summonerId: string) {
  const rankedStats = await riotApi.rank(summonerId)
  if (rankedStats.length > 0) {
    rankedStats.forEach(async (stats: any) => {
      const { summonerId, ...rest } = stats
      const rankedStatsExists = await prisma.rankedStats.findFirst({
        where: {
          summonerId,
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
            ...rest,
            summoner: {
              connect: {
                summonerId
              }
            }
          }
        })
      }
    })
  }
}

async function updateMatchHistory(matches: any[], name: string) {
  try {
    const summoner = await prisma.summoner.findFirst({
      where: {
        name
      }
    })

    if (!summoner || !matches) return

    await Promise.all(
      matches.map(async (match: any) => {
        const matchExists = await prisma.match.findFirst({
          where: {
            matchId: match.metadata.matchId
          }
        })

        if (matchExists) {
          await prisma.match.update({
            where: {
              id: matchExists.id
            },
            data: {
              summoners: {
                connect: {
                  id: summoner.id
                }
              }
            }
          })
        } else {
          await prisma.match.create({
            data: {
              date: match.info.gameCreation,
              matchId: match.metadata.matchId,
              info: match.info,
              metaData: match.metadata,
              summoners: {
                connect: {
                  id: summoner.id
                }
              }
            }
          })
        }
      })
    )
  } catch (e) {}
}

async function updateProfileAndMatchHistory(name: string) {
  await addRecentMatches(name)
  await sleep(1100)
  await updateSummonerProfile(name)

  // revalidate relevant paths and tags
  revalidatePath(`/grabb/${name}/matches`)
  revalidatePath(`/grabb/${name}/ranked`)
  revalidatePath(`/grabb/${name}/stats`)
  revalidateTag('summoners')
}

export const prismaService = {
  updateProfileAndMatchHistory,
  addRecentMatches,
  updateSummonerProfile,
  updateRankedStats,
  updateMatchHistory
}
