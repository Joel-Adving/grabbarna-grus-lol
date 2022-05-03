import { limit, orderBy } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getSubCollection } from '../firebase/getSubCollection'
import { useGetSummoners } from './useGetSummoners'

export const useGetMatchHistory = () => {
    const router = useRouter()
    const { name } = router.query
    const { summoners } = useGetSummoners()
    const [matchHistory, setMatchHistory] = useState<any>(null)
    const [summoner, setSummoner] = useState<any>(null)

    useEffect(() => {
        if (!summoners) return
        getMatchHistory()
    }, [summoners, name])

    const getMatchHistory = async () => {
        const foundSummoner = summoners?.find(summoner => summoner.name === name)
        setSummoner(foundSummoner)
        const resMatches = await getSubCollection('match-history', foundSummoner.id, 'match', [
            orderBy('info.gameEndTimestamp', 'desc'),
            limit(20),
        ])

        setMatchHistory(resMatches)
    }
    return { matchHistory, summoner }
}
