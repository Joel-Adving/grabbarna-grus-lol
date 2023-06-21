import { Match } from '@/types'
import useSWR from 'swr'

const fetcher = async (matchId: string) => await fetch(`/api/match/${matchId}`).then((res) => res.json())

export function useGetMatch(matchId: string) {
  const { data, error, isLoading } = useSWR<Match>(matchId ? `match/${matchId}` : null, () => fetcher(matchId))

  return {
    match: data,
    error,
    isLoading
  }
}
