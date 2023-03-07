import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const summoners = await prisma.summoner.findMany({
    include: {
      rankedStats: true
    }
  })

  if (!summoners) {
    res.status(404).json({ message: 'Summoners not found' })
  }

  res.status(200).json(summoners)
}
