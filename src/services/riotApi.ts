import { get } from '../utils/helpers'

const KEY = process.env.RIOT_API_KEY
const domain = 'api.riotgames.com'

async function getPuuid(name: string, region = 'europe', tag = 'EUNE') {
  return await get(`https://${region}.${domain}/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${KEY}`)
}

async function getSummonerByName(name: string) {
  const partialProfile = await getPuuid(name)
  if (!partialProfile) {
    throw new Error('Summoner not found')
  }
  const res = await summoner(partialProfile.puuid)
  if (!res) {
    throw new Error('Summoner not found')
  }
  return {
    name: partialProfile.gameName,
    ...res
  }
}

async function summoner(encryptedPUUID: string, region = 'eun1') {
  return await get(`https://${region}.${domain}/lol/summoner/v4/summoners/by-puuid/${encryptedPUUID}?api_key=${KEY}`)
}

async function summoners(puuids: string[]) {
  return await Promise.all(puuids.map((puuid) => summoner(puuid)))
}

async function match(matchId: string, region = 'europe') {
  return await get(`https://${region}.${domain}/lol/match/v5/matches/${matchId}?api_key=${KEY}`)
}

async function matches(matchIds: string[]) {
  return await Promise.all(
    matchIds.map(async (id) => {
      return match(id)
    })
  )
}

async function activeMatch(id: string, region = 'europe') {
  return await get(`https://${region}.${domain}/lol/spectator/v4/active-games/by-summoner/${id}?api_key=${KEY}`)
}

async function activeMatches(ids: string[]) {
  return await Promise.all(ids.map((id) => activeMatch(id)))
}

async function matchHistory(puuid: string, region = 'europe') {
  return await get(`https://${region}.${domain}/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${KEY}`)
}

async function matchHistories(puuids: string[], region = 'europe') {
  return await Promise.allSettled(
    puuids.map(async (puuid) => {
      const res = await get(`https://${region}.${domain}/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${KEY}`)
      return { puuid, matches: res }
    })
  )
}

async function rank(id: string, region = 'europe') {
  return await get(`https://${region}.${domain}/lol/league/v4/entries/by-summoner/${id}?api_key=${KEY}`)
}

async function ranks(ids: string[]) {
  return await Promise.allSettled(ids.map((id) => rank(id)))
}

async function getQueueTypes() {
  for (let i = 0; i < 3; i++) {
    try {
      return await fetch('https://static.developer.riotgames.com/docs/lol/queues.json').then((res) => res.json())
    } catch (e) {
      await new Promise((e) => setTimeout(e, 250 * i))
    }
  }
  return await get(window.location.origin + '/queues.json')
}

export const riotApi = {
  getSummonerByName,
  getPuuid,
  summoner,
  summoners,
  match,
  matches,
  activeMatch,
  activeMatches,
  matchHistory,
  matchHistories,
  rank,
  ranks,
  getQueueTypes
}
