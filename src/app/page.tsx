import RankList from '@/components/RankList'
import { db } from '@/services/dbQueries'

export const revalidate = 3600 // 1 hour

export default async function Home() {
  const summoners = await db.summoners.findManyIncludeRankedStats()
  return <RankList summoners={summoners} />
}
