import { doc, setDoc, where, getDoc, startAfter, limit, updateDoc, orderBy, startAt } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../firebase/config'
import { getCollection } from '../../../firebase/getCollection'
import { sleep } from '../../../util/helpers'
import { matches, matchHistory, rank, summoner } from '../../../util/riotFetch'

const addRecentMatches = async (summonerName: string) => {
    const resSummoner = await summoner(summonerName)
    const resMatchHistory = await matchHistory(resSummoner.puuid)
    await sleep(1100)
    const matchesInfo = await matches(resMatchHistory)

    for (const match of matchesInfo) {
        if (match?.metadata?.matchId)
            await setDoc(doc(db, `/match-history/${resSummoner.id}/match/${match.metadata.matchId}`), { ...match })
    }
}

const updateSummonerProfile = async (summonerName: string) => {
    const summoner = await getCollection('summoners', [where('name', '==', summonerName)])
    const resRank = await rank(summoner[0].id)
    const completeSummonerProfile = { ...summoner[0], rankedStats: resRank }
    await setDoc(doc(db, `/summoners/${summoner[0].id}`), completeSummonerProfile)
}

const updateGrabb = async (summonerId: string) => {
    const docSnap = await getDoc(doc(db, 'summoners', summonerId))

    if (!docSnap.exists()) return
    const summonerName = docSnap.data().name

    addRecentMatches(summonerName)
    await sleep(1100)
    updateSummonerProfile(summonerName)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { summonerId, key } = req.query

    if (key !== process.env.UPDATE_GRABB) return res.json([{ error: { message: 'unauthorized', status: 401 } }])

    if (summonerId !== '_') {
        const docRef = doc(db, 'summoners', summonerId.toString())
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            updateGrabb(docSnap.id)
            return res.json({ updated: docSnap.data() })
        }
        return res.json({ error: { message: `${summonerId} does not exist in database` }, status: 404 })
    }

    const docRef = doc(db, 'last-updated', 'grabb')
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) return res.json({ error: 'error', status: 404 })

    updateGrabb(docSnap.id)

    const [nextToBeUpdated] = await getCollection('summoners', [
        orderBy('id'),
        startAfter(docSnap.data().summonerId),
        limit(1),
    ])

    if (!nextToBeUpdated) {
        const [fromBeginning] = await getCollection('summoners', [orderBy('id'), startAt(0), limit(1)])
        await updateDoc(docRef, {
            summonerId: fromBeginning.id,
        })
        res.json({ updated: docSnap.data().id, nextUp: fromBeginning.name })
    } else {
        await updateDoc(docRef, {
            summonerId: nextToBeUpdated.id,
        })
        res.json({ updated: docSnap.data().id, nextUp: nextToBeUpdated.name })
    }
}
