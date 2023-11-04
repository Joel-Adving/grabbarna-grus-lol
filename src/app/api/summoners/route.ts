import { db } from '@/services/dbQueries'

export async function GET() {
  const summoners = await db.summoners.findManyIncludeRankedStats()

  if (!summoners) {
    return Response.json({ message: 'Summoners not found' })
  }

  return Response.json(summoners)
}
