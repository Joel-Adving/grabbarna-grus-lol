import PlayerStats from '@/components/PlayerStats'

export default function StatsPage({ params }: { params: { name: string } }) {
  return <PlayerStats name={params.name} />
}
