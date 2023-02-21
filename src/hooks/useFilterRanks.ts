'use client'

import { useEffect, useState } from 'react'
import { leagueRanks, leagueTiers } from '../util/config'

export const useFilterRanks = (summoners: Array<any>) => {
  const [filter, setFilter] = useState('RANKED_FLEX_SR')
  const [sortedSummoners, setSortedSummoners] = useState<Array<any>>([])

  useEffect(() => {
    const filteredByQueue = summoners.map((summoner) => ({
      ...summoner,
      rankedStats: summoner.rankedStats.find((el: any) => el.queueType === filter)
    }))

    const hasRanks = filteredByQueue.slice().filter((el) => el.rankedStats)
    const noRanks = filteredByQueue.slice().filter((el) => el.rankedStats === null || el.rankedStats === undefined)
    const sortedByRank = hasRanks
      .sort((a, b) => leagueRanks[a.rankedStats.rank] - leagueRanks[b.rankedStats.rank])
      .sort((a, b) => leagueTiers[a.rankedStats.tier] - leagueTiers[b.rankedStats.tier])

    setSortedSummoners([...sortedByRank, ...noRanks])
  }, [filter])

  return { sortedSummoners, filter, setFilter }
}
