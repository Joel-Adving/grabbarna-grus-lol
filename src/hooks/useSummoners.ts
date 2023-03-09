import useSWR from 'swr'

const fetcher = async () => await fetch(`/api/summoners`).then((res) => res.json())

export function useSummoners() {
  const { data, error, isLoading } = useSWR('summoners', fetcher)

  return {
    summoners: data,
    error,
    isLoading
  }
}
