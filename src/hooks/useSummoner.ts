import { RankedStats, Summoner } from '@prisma/client'
import useSWR from 'swr'

const fetcher = async (name: string) => await fetch(`/api/summoners/name/${name}`).then((res) => res.json())

export type FullSummonerProfile = Summoner & {
  rankedStats: RankedStats[]
}

export function useSummoner(name: string) {
  const { data, error, isLoading } = useSWR<FullSummonerProfile>(name ? `summoner/${name}` : null, () => fetcher(name))

  return {
    summoner: data,
    error,
    isLoading
  }
}
