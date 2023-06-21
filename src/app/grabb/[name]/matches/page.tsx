import MatchHistory from '@/components/MatchHistory'

export default function MatchHistoryPage({ params }: { params: { name: string } }) {
  const { name } = params
  return <MatchHistory name={name} />
}
