import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  if (!id) {
    return Response.json({ message: 'Summoner id not found' })
  }

  const summoner = await prisma.summoner.findFirst({
    where: {
      id: +id!
    }
  })

  if (!summoner) {
    return Response.json({ message: `Summoner ${id} not found` })
  }

  return Response.json(summoner)
}
