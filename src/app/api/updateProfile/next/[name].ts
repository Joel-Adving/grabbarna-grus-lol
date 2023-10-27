import { findSummonerByName, logRequestInfo } from '@/utils/helpers'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { nextApi } from '@/services/nextApi'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  logRequestInfo(req)

  const { key, name } = req.query
  if (key !== process.env.UPDATE_GRABB || !name) {
    return res.json('bruh')
  }

  const summoners = await nextApi.getSummoners()

  if (!summoners) {
    return res.json('bruh')
  }

  const foundSummoner = findSummonerByName(summoners, name as string)
  if (!foundSummoner) {
    return res.json({ error: { message: name + " doesn't exist in database", status: 404 } })
  }

  const summoner = await prisma.lastUpdated.findFirst()
  if (!summoner) {
    await prisma.lastUpdated.create({
      data: {
        name: foundSummoner.name,
        summonerId: foundSummoner.summonerId
      }
    })
    return res.json('bruh')
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

  res.json({
    'Next profile to be updated': {
      name: foundSummoner.name,
      summonerId: foundSummoner.id
    }
  })
}
