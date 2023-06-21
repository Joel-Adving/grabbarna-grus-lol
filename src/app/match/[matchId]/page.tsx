import Match from '@/components/Match'

export default function Page({ params, searchParams }: any) {
  const { matchId } = params
  const { summoner } = searchParams
  return <Match matchId={matchId} summoner={summoner} />
}
