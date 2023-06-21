import { useEffect, useState } from 'react'
import { QueueType, summonerRankInfo } from '../types'
import { FullSummonerProfile } from './useSummoner'

export const useRankedStats = (summoner: FullSummonerProfile | undefined) => {
  const [filter, setFilter] = useState<QueueType>('RANKED_FLEX_SR')
  const [queuStats, setQueueStats] = useState<summonerRankInfo | null | undefined>(null)

  useEffect(() => {
    if (!summoner) return
    if (summoner.rankedStats.length) {
      setQueueStats(summoner.rankedStats.find((queue) => queue.queueType === filter))
    } else setQueueStats(null)
  }, [filter, summoner])

  return { filter, queuStats, setFilter, setQueueStats }
}
