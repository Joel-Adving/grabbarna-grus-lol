import { getJSON } from './helpers'

const summoner = async (summonerName, region = 'eun1') => {
    const res = await getJSON(
        `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.NEXT_PUBLIC_LIMITED_KEY}`
    )
    return res
}

const summoners = async summoners => {
    const res = await Promise.all(summoners.map(smnr => summoner(smnr)))
    return res
}

const match = async (matchId, region = 'europe') => {
    const res = await getJSON(
        `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.NEXT_PUBLIC_LIMITED_KEY}`
    )
    return res
}

const matches = async matchIds => {
    const res = await Promise.all(matchIds.map(id => match(id)))
    return res
}

const activeMatch = async (summonerId, region = 'eun1') => {
    const res = await getJSON(
        `https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}?api_key=${process.env.NEXT_PUBLIC_LIMITED_KEY}`
    )

    return res
}

const activeMatches = async summonerIds => {
    const res = await Promise.all(summonerIds.map(id => activeMatch(id)))
    return res
}

const matchHistory = async (puuid, region = 'europe') => {
    const res = await getJSON(
        `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${process.env.NEXT_PUBLIC_LIMITED_KEY}`
    )
    return res
}

const matchHistories = async (puuids, region = 'europe') => {
    const res = await Promise.all(
        puuids.map(async puuid => {
            const res = await getJSON(
                `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${process.env.NEXT_PUBLIC_LIMITED_KEY}`
            )
            return { puuid, matches: res }
        })
    )
    return res
}

export { summoner, summoners, match, matches, matchHistory, matchHistories, activeMatch, activeMatches }
