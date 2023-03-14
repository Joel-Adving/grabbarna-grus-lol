import { useEffect, useState } from 'react'
import { summonerRankInfo } from '../types'
import { FullSummonerProfile } from './useSummoner'

export const useRankedStats = (summoner: FullSummonerProfile) => {
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
