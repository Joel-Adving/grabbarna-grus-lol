import { useEffect, useState } from 'react'
import { QueueType } from '../types'
import { FullSummonerProfile } from './useSummoner'
import { RankedStats } from '@prisma/client'

export const useRankedStats = (summoner: FullSummonerProfile | undefined) => {
  const [filter, setFilter] = useState<QueueType>('RANKED_FLEX_SR')
  const [queuStats, setQueueStats] = useState<RankedStats | null | undefined>(null)

  useEffect(() => {
    if (!summoner) return
    if (summoner.rankedStats.length) {
      setQueueStats(summoner.rankedStats.find((queue) => queue.queueType === filter))
    } else setQueueStats(null)
  }, [filter, summoner])

  return { filter, queuStats, setFilter, setQueueStats }
}
