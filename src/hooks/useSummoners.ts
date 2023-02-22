import { getCollection } from '@/lib/firebase/getCollection'
import useSWR from 'swr'

const fetcher = async () => await getCollection('summoners')

export function useSummoners() {
  const { data, error, isLoading } = useSWR('summoners', fetcher)

  return {
    summoners: data,
    error,
    isLoading
  }
}
