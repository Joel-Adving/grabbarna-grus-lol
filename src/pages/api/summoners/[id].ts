import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  const summoner = await prisma.summoner.findFirst({
    where: {
      id: +id!
    }
  })

  if (!summoner) {
    res.status(404).json({ message: `Summoner ${id} not found` })
  }

  res.status(200).json(summoner)
}
