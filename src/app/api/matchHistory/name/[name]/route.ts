import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { name: string } }) {
  const { name } = params

  if (!name) {
    return Response.json({ message: `No name provided` })
  }

  const url = new URL(request.url)
  const fetchAll = url.searchParams.get('fetchAll')
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

    if (!matches) {
      return Response.json({ message: `No matches found for ${name}` })
    }
    return Response.json(matches)
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
    return Response.json({ message: `No matches found for ${name}` })
  }
  return Response.json(matches)
}
