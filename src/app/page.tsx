import RankList from '@/components/RankList'
import { api } from '@/services/api'

export default async function Home() {
  const summoners = await api.getSummoners()
  return <RankList summoners={summoners} />
}
