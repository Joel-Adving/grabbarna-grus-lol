import SummonerRankedInfo from '@/components/SummonerRankedInfo'

export default function RankedStatsPage({ params }: any) {
  const { name } = params
  return <SummonerRankedInfo name={name} />
}
