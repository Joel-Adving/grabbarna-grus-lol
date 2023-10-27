import PlayerStats from '@/components/PlayerStats'

export const revalidate = 3600 // 1 hour

export default function StatsPage({ params }: any) {
  const { name } = params

  return (
    <>
      <PlayerStats name={name as string} />
    </>
  )
}
