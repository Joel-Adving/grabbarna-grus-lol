import { prisma } from '@/libs/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, fetchAll } = req.query

  if (!name) {
    res.status(404).json({ message: `No name provided` })
  }

  if (fetchAll && fetchAll === 'true') {
    const matches = await prisma.match.findMany({
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

    if (!matches) res.status(404).json({ message: `No matches found for ${name}` })
    res.status(200).json(matches)
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

  if (!matches) res.status(404).json({ message: `No matches found for ${name}` })
  res.status(200).json(matches)
}
