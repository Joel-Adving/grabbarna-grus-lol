import { db } from '@/services/dbQueries'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  if (!id || typeof +id !== 'number' || isNaN(+id) || !isFinite(+id)) {
    return Response.json({ message: `Invalid ID: ${id}` })
  }

  const url = new URL(request.url)
  const fetchAll = url.searchParams.get('fetchAll') === 'true'

  try {
    const matches = await db.summoners.matches(+id!, fetchAll ? 9999 : 20)

    if (!matches) {
      return Response.json({ message: `No matches found for ${id}` })
    }

    return Response.json(matches)
  } catch (error) {
    return Response.json({ message: `No matches found for ${id}` })
  }
}
