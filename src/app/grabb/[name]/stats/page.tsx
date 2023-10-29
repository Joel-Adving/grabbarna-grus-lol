import PlayerStats from '@/components/PlayerStats'

export default function StatsPage({ params }: any) {
  const { name } = params

  return (
    <>
      <PlayerStats name={name as string} />
    </>
  )
}
