import { findSummonerByName, logRequestInfo, sleep } from '@/utils/helpers'
import { NextApiRequest, NextApiResponse } from 'next'
import { nextApi } from '@/services/nextApi'
import { riotApi } from '@/services/riotApi'
import { prisma } from '@/lib/prisma'
import { prismaService } from '@/services/prismaService'
import { revalidateTag, revalidatePath } from 'next/cache'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  logRequestInfo(req)

  if (req.query.key !== process.env.UPDATE_GRABB) {
    return res.json('access denied')
  }

  const summonerName = req.query.name as string
  if (!summonerName) {
    return res.status(200).json({ message: 'Summoner name is required' })
  }

  const summoners = await nextApi.getSummoners()
  if (!summoners) {
    return res.json('bruh')
  }

  const foundSummoner = findSummonerByName(summoners, summonerName)
  if (foundSummoner) {
    return res.status(200).json({ message: `${summonerName} already added` })
  }

  const summoner = await riotApi.summoner(summonerName)
  if (!summoner) {
    return res.status(200).json({ message: `Summoner ${summonerName} not found` })
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

  return res.status(201).json({ success: true, data: { ...createdSummoner } })
}
