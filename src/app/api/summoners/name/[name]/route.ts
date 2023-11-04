import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { name: string } }) {
  const { name } = params

  if (!name) {
    return Response.json({ message: 'Summoner name not found' })
  }

  //   const summoner = await db.summoners.findByNameIncludeRankedStats(name)

  const summoner = await prisma.summoner.findFirst({
    where: {
      name: name as string
    },
    include: {
      rankedStats: true
    }
  })

  if (!summoner) {
    return Response.json({ message: `Summoner ${name} not found` })
  }

  return Response.json(summoner)
}
