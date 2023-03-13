import MatchHistory from '@/components/MatchHistory'

export default function MatchHistoryPage({ params }: any) {
  const { name } = params
  return <MatchHistory name={name} />
}
