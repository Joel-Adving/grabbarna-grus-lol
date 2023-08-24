import { leagueRanks, leagueTiers } from '@/constants'
import { SortRankedType, LeagueTiers, LeagueRanks, Summoner } from '@/types'

export function sortSummonerByRank(summoners: Summoner[], sortType: SortRankedType) {
  const filteredByQueue = summoners.map((summoner) => ({
    ...summoner,
    rankedStats: summoner.rankedStats.find((el) => el.queueType === sortType)
  }))
  const hasRanks = filteredByQueue.slice().filter((el) => el.rankedStats)
  const noRanks = filteredByQueue.slice().filter((el) => el.rankedStats === null || el.rankedStats === undefined)
  const sortedByRank = hasRanks
    .sort((a, b) => leagueRanks[a?.rankedStats?.rank as LeagueRanks] - leagueRanks[b?.rankedStats?.rank as LeagueRanks])
    .sort((a, b) => leagueTiers[a?.rankedStats?.tier as LeagueTiers] - leagueTiers[b?.rankedStats?.tier as LeagueTiers])
  return [...sortedByRank, ...noRanks]
}
