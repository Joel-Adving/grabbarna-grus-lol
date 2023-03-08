import { useEffect, useState } from 'react'
import { leagueRanks, leagueTiers } from '../config'
import { useSummoners } from './useSummoners'

export const useFilterRanks = () => {
  const { summoners } = useSummoners()
  const [filter, setFilter] = useState('RANKED_FLEX_SR')
  const [sortedSummoners, setSortedSummoners] = useState<Array<any>>([])

  useEffect(() => {
    if (!summoners) return
    const filteredByQueue = summoners.map((summoner: any) => ({
      ...summoner,
      rankedStats: summoner.rankedStats.find((el: any) => el.queueType === filter)
    }))

    const hasRanks = filteredByQueue.slice().filter((el: any) => el.rankedStats)
    const noRanks = filteredByQueue.slice().filter((el: any) => el.rankedStats === null || el.rankedStats === undefined)
    const sortedByRank = hasRanks
      .sort((a: any, b: any) => leagueRanks[a.rankedStats.rank] - leagueRanks[b.rankedStats.rank])
      .sort((a: any, b: any) => leagueTiers[a.rankedStats.tier] - leagueTiers[b.rankedStats.tier])

    setSortedSummoners([...sortedByRank, ...noRanks])
  }, [filter, summoners])

  return { sortedSummoners, filter, setFilter }
}
