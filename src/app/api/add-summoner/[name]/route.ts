import { findSummonerByName, logRequestInfo, sleep } from '@/utils/helpers'
import { nextApi } from '@/services/nextApi'
import { riotApi } from '@/services/riotApi'
import { prisma } from '@/lib/prisma'
import { prismaService } from '@/services/prismaService'

export async function GET(request: Request, { params }: { params: { name: string } }) {
  const url = new URL(request.url)
  const key = url.searchParams.get('key')
  logRequestInfo(request)

  if (key !== process.env.UPDATE_GRABB) {
    return Response.json('access denied')
  }

  const name = params.name
  if (!name) {
    return Response.json({ message: 'name is required' })
  }

  try {
    const summoners = await nextApi.getSummoners()
    if (!summoners) {
      return Response.json('No summoners found')
    }

    const foundSummoner = findSummonerByName(summoners, name)
    if (foundSummoner) {
      return Response.json({ message: `${foundSummoner.name} already added` })
    }

    const region = url.searchParams.get('region') ?? 'europe'
    const tag = url.searchParams.get('tag') ?? 'EUNE'
    const summoner = await riotApi.getSummonerByName(name, region, tag)

    if (!summoner) {
      return Response.json({ message: 'Summoner not found' })
    }
    const { id, ...rest } = summoner
    const createdSummoner = await prisma.summoner.create({
      data: {
        summonerId: id,
        ...rest
      }
    })
    await sleep(1100)
    await prismaService.updateProfileAndMatchHistory(summoner.name)
    return Response.json({ success: true, data: { ...createdSummoner } })
  } catch (error) {
    console.log(error)
    return Response.json({ message: 'Error' })
  }
}
