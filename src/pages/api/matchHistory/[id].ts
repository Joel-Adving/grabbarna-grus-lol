import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (!id || typeof +id !== 'number' || isNaN(+id) || !isFinite(+id)) {
    res.status(400).json({ message: `Invalid ID: ${id}` })
  }

  const matches = await prisma.match.findMany({
    where: {
      summoners: {
        some: {
          id: +id!
        }
      }
    },
    orderBy: {
      date: 'desc'
    }
  })

  if (!matches) {
    res.status(404).json({ message: `No matches found for ${id}` })
  }

  res.status(200).json(matches)
}
