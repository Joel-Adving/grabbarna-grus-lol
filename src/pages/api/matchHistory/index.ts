import { prisma } from '@/libs/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const matches = await prisma.match.findMany()

  if (!matches) {
    res.status(404).json({ message: `No matches found` })
  }

  res.status(200).json(matches)
}
