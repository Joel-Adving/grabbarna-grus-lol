import { useMemo } from 'react'
import useSWR from 'swr'

async function fetcher() {
  return await fetch('https://static.developer.riotgames.com/docs/lol/queues.json').then((res) => res.json())
}

export function useGetQueueTypes() {
  const { data, error, isLoading } = useSWR('queues', fetcher)

  const queues = useMemo(
    () =>
      data
        ?.filter((queue: any) => !queue?.notes?.toLowerCase()?.includes('deprecated'))
        ?.map((el: any) => ({
          ...el,
          description: el?.description
            ?.replace(/\b(?:1v1|2v2|5v5|6v6|games)\b/gi, '')
            .replace('Ranked Solo', 'Ranked Solo/Duo')
            .trim()
        })) ?? [],
    [data]
  )

  return {
    queues,
    error,
    isLoading
  }
}
