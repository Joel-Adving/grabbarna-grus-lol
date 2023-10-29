import SummonerRankedInfo from '@/components/SummonerRankedInfo'

export const revalidate = 3600 // 1 hour

export default function RankedStatsPage({ params }: { params: { name: string } }) {
  return <SummonerRankedInfo name={params.name} />
}
