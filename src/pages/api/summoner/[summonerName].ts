import { matches, matchHistory, summoner } from '../../../util/riotFetch'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { summonerName } = req.query
    const resSummoner = await summoner(summonerName.toString())
    const resMatchHistory = await matchHistory(resSummoner.puuid)
    const resMatches = await matches(resMatchHistory)

    res.json(
        JSON.stringify({
            summoner: resSummoner,
            matchHistory: resMatches,
        })
    )
}
