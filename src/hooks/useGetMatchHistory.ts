import { useSummoners } from './useSummoners'
import useSWR from 'swr'
import { API_URL } from '@/utils/config'

const fetcher = async (name: string) => await fetch(`${API_URL}/matchHistory/name/${name}`).then((res) => res.json())

export const useGetMatchHistory = (name: string) => {
  const { summoners } = useSummoners()
  const summoner = summoners?.find((summoner: any) => summoner.name === name)
  const { data: matchHistory, isLoading } = useSWR(name ? `matchHistory/${name}` : null, () => fetcher(name))

  //   console.log('matchHistory', matchHistory)

  return {
    matchHistory,
    summoner,
    isLoading
  }
}
