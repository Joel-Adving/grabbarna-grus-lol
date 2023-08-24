import { useMemo, useState } from 'react'
import { SortRankedType, Summoner } from '@/types'
import { useGetSummoners } from './useSummoners'
import { sortSummonerByRank } from '@/utils/sorting'

export const useSortRanks = (summoners: Summoner[]) => {
  const { summoners: clientSummoners } = useGetSummoners()
  const [sortBy, setSortBy] = useState<SortRankedType>('RANKED_FLEX_SR')

  const sortedSummoners = useMemo(() => {
    if (clientSummoners) {
      return sortSummonerByRank(clientSummoners, sortBy)
    } else if (summoners) {
      return sortSummonerByRank(summoners, sortBy)
    }
    return []
  }, [clientSummoners, sortBy, summoners])

  return { sortedSummoners, sortBy, setSortBy }
}
