import { getJSON } from '../helpers'

const KEY = process.env.RIOT_API_KEY
const domain = 'api.riotgames.com/lol'

async function summoner(name: string, region = 'eun1') {
  return await getJSON(`https://${region}.${domain}/summoner/v4/summoners/by-name/${name}?api_key=${KEY}`)
}

async function summoners(names: string[]) {
  return await Promise.all(names.map((name) => summoner(name)))
}

async function match(matchId: string, region = 'europe') {
  return await getJSON(`https://${region}.${domain}/match/v5/matches/${matchId}?api_key=${KEY}`)
}

async function matches(matchIds: string[]) {
  return await Promise.all(
    matchIds.map(async (id) => {
      return match(id)
    })
  )
}

async function activeMatch(id: string, region = 'eun1') {
  return await getJSON(`https://${region}.${domain}/spectator/v4/active-games/by-summoner/${id}?api_key=${KEY}`)
}

async function activeMatches(ids: string[]) {
  return await Promise.all(ids.map((id) => activeMatch(id)))
}

async function matchHistory(puuid: string, region = 'europe') {
  return await getJSON(`https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${KEY}`)
}

async function matchHistories(puuids: string[], region = 'europe') {
  return await Promise.all(
    puuids.map(async (puuid) => {
      const res = await getJSON(
        `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${KEY}`
      )
      return { puuid, matches: res }
    })
  )
}

async function rank(id: string, region = 'eun1') {
  return await getJSON(`https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${KEY}`)
}

async function ranks(ids: string[]) {
  return await Promise.all(ids.map((id) => rank(id)))
}

export { summoner, summoners, match, matches, activeMatch, activeMatches, matchHistory, matchHistories, rank, ranks }
