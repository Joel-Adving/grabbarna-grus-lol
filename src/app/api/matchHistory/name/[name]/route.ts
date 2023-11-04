import { db } from '@/services/dbQueries'

export async function GET(request: Request, { params }: { params: { name: string } }) {
  const { name } = params

  if (!name) {
    return Response.json({ message: `No name provided` })
  }

  const url = new URL(request.url)
  const fetchAll = url.searchParams.get('fetchAll')

  try {
    const summoner = await db.summoners.findByName(name as string)
    const matches = await db.summoners.matches(summoner.id!, fetchAll ? 9999 : 20)

    if (!matches) {
      return Response.json({ message: `No matches found for ${name}` })
    }

    return Response.json(matches)
  } catch (error) {
    return Response.json({ message: `No matches found for ${name}` })
  }
}
