import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { matchId: string } }) {
  const { matchId } = params

  if (!matchId) {
    return Response.json({ message: 'Match id not found' })
  }

  const match = await prisma.match.findUnique({
    where: {
      matchId: matchId as string
    }
  })

  if (!match) {
    return Response.json({ message: 'Match not found' })
  }

  return Response.json(match)
}
