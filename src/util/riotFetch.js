import { getJSON, sleep } from './helpers'

const KEY = process.env.NEXT_PUBLIC_LIMITED_KEY

export const summoner = async (summonerName, region = 'eun1') => {
    const res = await getJSON(
        `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${KEY}`
    )
    return res
}

export const summoners = async summonerNames => {
    const res = await Promise.all(summonerNames.map(name => summoner(name)))
    return res
}

export const match = async (matchId, region = 'europe') => {
    const res = await getJSON(`https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${KEY}`)
    return res
}

export const matches = async matchIds => {
    const res = await Promise.all(matchIds.map(id => match(id)))
    return res
}

export const activeMatch = async (summonerId, region = 'eun1') => {
    const res = await getJSON(
        `https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}?api_key=${KEY}`
    )

    return res
}

export const activeMatches = async summonerIds => {
    const res = await Promise.all(summonerIds.map(id => activeMatch(id)))
    return res
}

export const matchHistory = async (puuid, region = 'europe') => {
    const res = await getJSON(
        `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${KEY}`
    )
    return res
}

export const matchHistories = async (puuids, region = 'europe') => {
    const res = await Promise.all(
        puuids.map(async puuid => {
            const res = await getJSON(
                `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${KEY}`
            )
            return { puuid, matches: res }
        })
    )
    return res
}

export const rank = async (summonerId, region = 'eun1') => {
    const res = await getJSON(
        `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${KEY}`
    )
    return res
}

export const ranks = async summonerIds => {
    const res = await Promise.all(summonerIds.map(id => rank(id)))
    return res
}
