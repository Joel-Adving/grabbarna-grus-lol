import { prisma } from '@/lib/prisma'
import { rank } from './riotApi'

export async function updateSummonerProfile(name: string) {
  const summoner = await prisma.summoner.findFirst({ where: { name } })

  if (!summoner) return

  const rankedStats = await rank(summoner.summonerId)

  await prisma.summoner.update({
    where: {
      id: summoner.id
    },
    data: {
      rankedStats
    }
  })
}
