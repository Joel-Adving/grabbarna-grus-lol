import { findSummonerById, findSummonerByName, logRequestInfo } from '@/utils/helpers'
import { prisma } from '@/lib/prisma'
import { nextApi } from '@/services/nextApi'
import { prismaService } from '@/services/prismaService'

export async function GET(request: Request, { params }: { params: { name: string } }) {
  const url = new URL(request.url)
  const key = url.searchParams.get('key')
  const name = params.name
  logRequestInfo(request)

  const summoners = await nextApi.getSummoners()
  if (!summoners) {
    return Response.json('bruh')
  }

  if (key !== process.env.UPDATE_GRABB) {
    return Response.json('bruuh')
  }

  if (name !== '_') {
    const foundSummoner = findSummonerByName(summoners, name)

    if (foundSummoner) {
      await prismaService.updateProfileAndMatchHistory(foundSummoner.name)
      console.log('updated: ', foundSummoner.name)
      return Response.json({ success: { status: 200 }, data: { updated: foundSummoner.name } })
    }

    return Response.json({ error: { message: `${name} does not exist in database` }, status: 404 })
  }

  const lastUpdated = await prisma.lastUpdated.findFirst()

  if (!lastUpdated) {
    await prisma.lastUpdated.create({
      data: {
        name: summoners[0].name,
        summonerId: summoners[0].summonerId
      }
    })
    return Response.json('no last updated')
  }

  const foundSummoner = findSummonerById(summoners, lastUpdated.summonerId)
  await prismaService.updateProfileAndMatchHistory(foundSummoner.name)
  const indexOfUpdatededProfile = summoners.findIndex((sum: any) => sum.summonerId === lastUpdated.summonerId)

  if (indexOfUpdatededProfile + 1 >= summoners.length) {
    await prisma.lastUpdated.update({
      where: {
        id: lastUpdated.id
      },
      data: {
        summonerId: summoners[0].summonerId,
        name: summoners[0].name
      }
    })

    console.log('updated: ', lastUpdated.name)
    console.log('next to be updated: ', summoners[0].name)

    return Response.json({ updated: lastUpdated.name, nextUp: summoners[0].name })
  }

  if (indexOfUpdatededProfile + 1 <= summoners.length) {
    const nextToBeUpdated = summoners[indexOfUpdatededProfile + 1]

    await prisma.lastUpdated.update({
      where: {
        id: lastUpdated.id
      },
      data: {
        summonerId: nextToBeUpdated.summonerId,
        name: nextToBeUpdated.name
      }
    })

    console.log('updated: ', lastUpdated.name)
    console.log('next to be updated: ', nextToBeUpdated.name)

    return Response.json({ updated: lastUpdated.name, nextUp: nextToBeUpdated.name })
  }
}
