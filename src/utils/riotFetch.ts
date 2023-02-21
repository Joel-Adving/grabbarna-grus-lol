import { getJSON } from './helpers'

const KEY = process.env.NEXT_PUBLIC_RIOT_API_KEY

const summoner = async (summonerName: string, region: string = 'eun1') => {
  const res = await getJSON(
    `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${KEY}`
  )
  return res
}

const summoners = async (summonerNames: Array<string>) => {
  const res = await Promise.all(summonerNames.map((name) => summoner(name)))
  return res
}

const match = async (matchId: string, region: string = 'europe') => {
  const res = await getJSON(`https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${KEY}`)
  return res
}

const matches = async (matchIds: Array<string>) => {
  const res = await Promise.all(
    matchIds.map(async (id) => {
      return match(id)
    })
  )
  return res
}

const activeMatch = async (summonerId: string, region: string = 'eun1') => {
  const res = await getJSON(
    `https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}?api_key=${KEY}`
  )

  return res
}

const activeMatches = async (summonerIds: Array<string>) => {
  const res = await Promise.all(summonerIds.map((id) => activeMatch(id)))
  return res
}

const matchHistory = async (puuid: string, region: string = 'europe') => {
  const res = await getJSON(`https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${KEY}`)
  return res
}

const matchHistories = async (puuids: Array<string>, region: string = 'europe') => {
  const res = await Promise.all(
    puuids.map(async (puuid) => {
      const res = await getJSON(
        `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${KEY}`
      )
      return { puuid, matches: res }
    })
  )
  return res
}

const rank = async (summonerId: string, region: string = 'eun1') => {
  const res = await getJSON(
    `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${KEY}`
  )
  return res
}

const ranks = async (summonerIds: Array<string>) => {
  const res = await Promise.all(summonerIds.map((id) => rank(id)))
  return res
}

export { summoner, summoners, match, matches, matchHistory, matchHistories, rank, ranks, activeMatch, activeMatches }
