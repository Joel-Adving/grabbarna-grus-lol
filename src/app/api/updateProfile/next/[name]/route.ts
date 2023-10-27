import { findSummonerByName, logRequestInfo } from '@/utils/helpers'
import { prisma } from '@/lib/prisma'
import { nextApi } from '@/services/nextApi'

export async function GET(request: Request, { params }: { params: { name: string } }) {
  const url = new URL(request.url)
  const key = url.searchParams.get('key')
  const name = params.name
  logRequestInfo(request)

  if (key !== process.env.UPDATE_GRABB || !name) {
    return Response.json('bruh')
  }

  const summoners = await nextApi.getSummoners()

  if (!summoners) {
    return Response.json('bruh')
  }

  const foundSummoner = findSummonerByName(summoners, name)
  if (!foundSummoner) {
    return Response.json({ error: { message: name + " doesn't exist in database", status: 404 } })
  }

  const summoner = await prisma.lastUpdated.findFirst()
  if (!summoner) {
    await prisma.lastUpdated.create({
      data: {
        name: foundSummoner.name,
        summonerId: foundSummoner.summonerId
      }
    })
    return Response.json('bruh')
  }

  await prisma.lastUpdated.update({
    where: {
      id: summoner.id
    },
    data: {
      summonerId: foundSummoner.summonerId,
      name: foundSummoner.name
    }
  })

  return Response.json({
    'Next profile to be updated': {
      name: foundSummoner.name,
      summonerId: foundSummoner.id
    }
  })
}
