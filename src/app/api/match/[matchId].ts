import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { matchId } = req.query

  const match = await prisma.match.findUnique({
    where: {
      matchId: matchId as string
    }
  })

  if (!match) return res.status(404).json({ message: 'Match not found' })

  res.status(200).json(match)
}
