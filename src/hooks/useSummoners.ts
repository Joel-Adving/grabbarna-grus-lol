import useSWR from 'swr'
import { Summoner } from '@/types'
import { nextApi } from '@/services/nextApi'

export function useGetSummoners() {
  const { data, error, isLoading } = useSWR<Summoner[]>('summoners', nextApi.getSummoners)

  return {
    summoners: data,
    error,
    isLoading
  }
}
