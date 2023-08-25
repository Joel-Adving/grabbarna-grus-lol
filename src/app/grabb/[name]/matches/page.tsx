import MatchHistory from '@/components/MatchHistory'
import { nextApi } from '@/services/nextApi'
import { riotApi } from '@/services/riotApi'

export const revalidate = 3600 // 1 hour

export async function generateStaticParams() {
  const summoners = await nextApi.getSummoners()
  return summoners.map((summoner) => ({
    name: summoner.name
  }))
}

export default async function MatchHistoryPage({ params }: { params: { name: string } }) {
  const { name } = params
  const summoner = await nextApi.getSummonerByName(name)
  const matchHistory = await nextApi.getMatchHistory(name)
  const queueTypes = await riotApi.getQueueTypes()

  return <MatchHistory serverSideSummoner={summoner} serverSideMatchHistory={matchHistory} queueTypes={queueTypes} />
}
