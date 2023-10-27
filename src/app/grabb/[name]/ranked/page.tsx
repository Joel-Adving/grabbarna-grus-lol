import SummonerRankedInfo from '@/components/SummonerRankedInfo'

export const revalidate = 3600 // 1 hour

export default function RankedStatsPage({ params }: any) {
  const { name } = params
  return <SummonerRankedInfo name={name} />
}
