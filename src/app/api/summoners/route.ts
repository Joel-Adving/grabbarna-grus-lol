import { prisma } from '@/lib/prisma'

export async function GET() {
  const summoners = await prisma.summoner.findMany({
    include: {
      rankedStats: true
    }
  })

  if (!summoners) {
    return Response.json({ message: 'Summoners not found' })
  }

  return Response.json(summoners)
}
