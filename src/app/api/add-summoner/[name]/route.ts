import { findSummonerByName, logRequestInfo, sleep } from '@/utils/helpers'
import { nextApi } from '@/services/nextApi'
import { riotApi } from '@/services/riotApi'
import { prisma } from '@/lib/prisma'
import { prismaService } from '@/services/prismaService'
import { revalidateTag, revalidatePath } from 'next/cache'

export async function GET(request: Request, { params }: { params: { name: string } }) {
  const url = new URL(request.url)
  const key = url.searchParams.get('key')
  logRequestInfo(request)

  if (key !== process.env.UPDATE_GRABB) {
    return Response.json('access denied')
  }

  const summonerName = params.name
  if (!summonerName) {
    return Response.json({ message: 'Summoner name is required' })
  }

  const summoners = await nextApi.getSummoners()
  if (!summoners) {
    return Response.json('bruh')
  }

  const foundSummoner = findSummonerByName(summoners, summonerName)
  if (foundSummoner) {
    return Response.json({ message: `${summonerName} already added` })
  }

  const summoner = await riotApi.summoner(summonerName)
  if (!summoner) {
    return Response.json({ message: `Summoner ${summonerName} not found` })
  }

  const { id, ...rest } = summoner
  const createdSummoner = await prisma.summoner.create({
    data: {
      summonerId: id,
      ...rest
    }
  })

  await sleep(1100)
  await prismaService.updateProfileAndMatchHistory(summonerName)

  revalidateTag('summoners')
  revalidatePath('/')

  return Response.json({ success: true, data: { ...createdSummoner } })
}
