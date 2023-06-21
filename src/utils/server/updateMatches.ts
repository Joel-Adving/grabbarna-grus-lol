import { prisma } from '@/lib/prisma'

export async function updateMatchHistory(matches: any[], name: string) {
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
