import useSWR from 'swr'
import { api } from '../services/api'
import { Summoner } from '@/types'

export function useGetSummoners() {
  const { data, error, isLoading } = useSWR<Summoner[]>('summoners', api.getSummoners)

  return {
    summoners: data,
    error,
    isLoading
  }
}
