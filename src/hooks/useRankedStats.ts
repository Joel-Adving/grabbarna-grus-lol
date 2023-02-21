import { useEffect, useState } from 'react'
import { Summoner, summonerRankInfo } from '../utils/types'

export const useRankedStats = (summoner: Summoner) => {
  const [filter, setFilter] = useState('RANKED_FLEX_SR')
  const [queuStats, setQueueStats] = useState<summonerRankInfo | null | undefined>(null)

  useEffect(() => {
    if (!summoner) return
    if (summoner.rankedStats.length) {
      setQueueStats(summoner.rankedStats.find((queue) => queue.queueType === filter))
    } else setQueueStats(null)
  }, [filter, summoner])

  return { filter, queuStats, setFilter, setQueueStats }
}
