import { useSummoners } from './useSummoners'
import useSWR from 'swr'

const fetcher = async (name: string) => await fetch(`/api/matchHistory/name/${name}`).then((res) => res.json())

export const useGetMatchHistory = (name: string) => {
  const { summoners } = useSummoners()
  const summoner = summoners?.find((summoner: any) => summoner.name === name)
  const { data: matchHistory, isLoading } = useSWR(name ? `matchHistory/${name}` : null, () => fetcher(name))

  return {
    matchHistory,
    summoner,
    isLoading
  }
}
