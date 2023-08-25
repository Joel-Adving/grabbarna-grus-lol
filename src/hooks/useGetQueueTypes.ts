import { useMemo } from 'react'
import useSWR from 'swr'

async function fetcher() {
  for (let i = 0; i < 3; i++) {
    try {
      return await fetch('https://static.developer.riotgames.com/docs/lol/queues.json').then((res) => res.json())
    } catch (e) {
      await new Promise((e) => setTimeout(e, 250 * i))
    }
  }
  return await fetch(window.location.origin + '/queues.json').then((res) => res.json())
}

function filterQueueTypes(queueTypes: any[]) {
  return queueTypes
    ?.filter((queue: any) => !queue?.notes?.toLowerCase()?.includes('deprecated'))
    ?.map((el: any) => ({
      ...el,
      description: el.description
        ?.replace(/\b(?:1v1|2v2|5v5|6v6|games)\b/gi, '')
        ?.replace('Ranked Solo', 'Ranked Solo/Duo')
        ?.trim()
    }))
}

export function useGetQueueTypes(serverSideQueueTypes: any) {
  const { data, error, isLoading } = useSWR('queues', fetcher)

  const queues = useMemo(() => {
    if (serverSideQueueTypes && !data) {
      return filterQueueTypes(serverSideQueueTypes)
    }
    if (data) {
      return filterQueueTypes(data)
    }
    return []
  }, [data, serverSideQueueTypes])

  return {
    queues,
    error,
    isLoading
  }
}
