import { findSummonerById, findSummonerByName, logRequestInfo } from '@/utils/helpers'
import { getSummoners } from '@/utils/server/getSummoners'
import { updateProfileAndMatchHistory } from '@/utils/riot/updateProfileAndMatchHistory'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  logRequestInfo(req)

  const { key, name } = req.query

  const summoners = await getSummoners()
  if (!summoners) {
    return res.json('bruh')
  }

  if (key !== process.env.UPDATE_GRABB) {
    return res.json('bruh')
  }

  if (name !== '_') {
    const foundSummoner = findSummonerByName(summoners, name as string)

    if (foundSummoner) {
      await updateProfileAndMatchHistory(foundSummoner.name)
      console.log('updated: ', foundSummoner.name)
      return res.json({ success: { status: 200 }, data: { updated: foundSummoner.name } })
    }

    return res.json({ error: { message: `${name} does not exist in database` }, status: 404 })
  }

  const lastUpdated = await prisma.lastUpdated.findFirst()
  if (!lastUpdated) {
    await prisma.lastUpdated.create({
      data: {
        name: summoners[0].name,
        summonerId: summoners[0].id
      }
    })
    return res.json('bruh')
  }

  const foundSummoner = findSummonerById(summoners, lastUpdated.summonerId)
  await updateProfileAndMatchHistory(foundSummoner.name)
  const indexOfUpdatededProfile = summoners.findIndex((s: any) => s.id === lastUpdated.summonerId)

  if (indexOfUpdatededProfile + 1 >= summoners.length) {
    await prisma.lastUpdated.update({
      where: {
        id: lastUpdated.id
      },
      data: {
        summonerId: summoners[0].id,
        name: summoners[0].name
      }
    })

    console.log('updated: ', lastUpdated.name)
    console.log('next to be updated: ', summoners[0].name)

    return res.json({ updated: lastUpdated.name, nextUp: summoners[0].name })
  }

  if (indexOfUpdatededProfile + 1 <= summoners.length) {
    const nextToBeUpdated = summoners[indexOfUpdatededProfile + 1]

    await prisma.lastUpdated.update({
      where: {
        id: lastUpdated.id
      },
      data: {
        summonerId: nextToBeUpdated.id,
        name: nextToBeUpdated.name
      }
    })

    console.log('updated: ', lastUpdated.name)
    console.log('next to be updated: ', nextToBeUpdated.name)

    return res.json({ updated: lastUpdated.name, nextUp: nextToBeUpdated.name })
  }
}
