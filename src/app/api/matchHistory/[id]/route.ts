import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  if (!id || typeof +id !== 'number' || isNaN(+id) || !isFinite(+id)) {
    return Response.json({ message: `Invalid ID: ${id}` })
  }

  const matches = await prisma.match.findMany({
    take: 20,
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
    return Response.json({ message: `No matches found for ${id}` })
  }

  return Response.json(matches)
}
