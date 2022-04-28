import { matches, matchHistory, summoner } from '../../../util/riotFetch'

export default async function handler(req, res) {
    const { summonerName } = req.query
    const resSummoner = await summoner(summonerName)
    const resMatchHistory = await matchHistory(resSummoner.puuid)
    const resMatches = await matches(resMatchHistory)

    res.json(
        JSON.stringify({
            summoner: resSummoner,
            matchHistory: resMatches,
        })
    )
}
