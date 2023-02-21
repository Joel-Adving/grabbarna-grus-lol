import { limit, orderBy } from 'firebase/firestore'
import { getSubCollection } from '@/lib/firebase/getSubCollection'
import { useSummoners } from './useSummoners'
import useSWR from 'swr'

const getMatchHistory = async (summonerId: string) => {
  return await getSubCollection('match-history', summonerId, 'match', [orderBy('info.gameEndTimestamp', 'desc'), limit(20)])
}

export const useGetMatchHistory = (name: string) => {
  const { summoners } = useSummoners()
  const summoner = summoners?.find((summoner: any) => summoner.name === name)
  const { data: matchHistory, isLoading } = useSWR(summoner?.id ? `matchhistory/${name}` : null, () =>
    getMatchHistory(summoner?.id)
  )

  return {
    matchHistory,
    summoner,
    isLoading
  }
}
