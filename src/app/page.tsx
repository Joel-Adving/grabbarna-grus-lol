import RankList from '@/components/RankList'
import { nextApi } from '@/services/nextApi'

export default async function Home() {
  const summoners = await nextApi.getSummoners()
  return <RankList summoners={summoners} />
}
