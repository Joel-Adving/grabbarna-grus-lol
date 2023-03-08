import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query

  if (!name) {
    res.status(404).json({ message: `No name provided` })
  }

  const matches = await prisma.match.findMany({
    take: 20,
    where: {
      summoners: {
        some: {
          name: name as string
        }
      }
    },
    orderBy: {
      date: 'desc'
    }
  })

  if (!matches) {
    res.status(404).json({ message: `No matches found for ${name}` })
  }

  res.status(200).json(matches)
}