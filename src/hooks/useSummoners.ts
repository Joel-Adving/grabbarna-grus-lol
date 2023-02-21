import { getCollection } from '@/lib/firebase/getCollection'
import useSWR from 'swr'

const getSummoners = async () => await getCollection('summoners')

export function useSummoners() {
  const { data, error, isLoading } = useSWR('summoners', getSummoners)

  return {
    summoners: data,
    error,
    isLoading
  }
}
