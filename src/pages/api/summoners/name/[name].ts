import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query

  const summoner = await prisma.summoner.findFirst({
    where: {
      name: name as string
    },
    include: {
      rankedStats: true
    }
  })

  if (!summoner) {
    res.status(404).json({ message: `Summoner ${name} not found` })
  }

  res.status(200).json(summoner)
}
