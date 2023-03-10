import { prisma } from '@/libs/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, cursor } = req.query

  if (!name) {
    res.status(404).json({ message: `No name provided` })
  }

  let matches

  if (cursor) {
    matches = await prisma.match.findMany({
      take: 20,
      skip: 1,
      cursor: {
        id: +cursor
      },
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
  } else {
    matches = await prisma.match.findMany({
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
  }

  if (!matches) {
    res.status(404).json({ message: `No matches found for ${name}` })
  }

  res.status(200).json(matches)
}
