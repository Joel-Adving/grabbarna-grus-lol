import { get } from '../utils/helpers'

const KEY = process.env.RIOT_API_KEY
const domain = 'api.riotgames.com/lol'

async function summoner(name: string, region = 'eun1') {
  return await get(`https://${region}.${domain}/summoner/v4/summoners/by-name/${name}?api_key=${KEY}`)
}

async function summoners(names: string[]) {
  return await Promise.all(names.map((name) => summoner(name)))
}

async function match(matchId: string, region = 'europe') {
  return await get(`https://${region}.${domain}/match/v5/matches/${matchId}?api_key=${KEY}`)
}

async function matches(matchIds: string[]) {
  return await Promise.all(
    matchIds.map(async (id) => {
      return match(id)
    })
  )
}

async function activeMatch(id: string, region = 'eun1') {
  return await get(`https://${region}.${domain}/spectator/v4/active-games/by-summoner/${id}?api_key=${KEY}`)
}

async function activeMatches(ids: string[]) {
  return await Promise.all(ids.map((id) => activeMatch(id)))
}

async function matchHistory(puuid: string, region = 'europe') {
  return await get(`https://${region}.${domain}/match/v5/matches/by-puuid/${puuid}/ids?api_key=${KEY}`)
}

async function matchHistories(puuids: string[], region = 'europe') {
  return await Promise.allSettled(
    puuids.map(async (puuid) => {
      const res = await get(`https://${region}.${domain}/match/v5/matches/by-puuid/${puuid}/ids?api_key=${KEY}`)
      return { puuid, matches: res }
    })
  )
}

async function rank(id: string, region = 'eun1') {
  return await get(`https://${region}.${domain}/league/v4/entries/by-summoner/${id}?api_key=${KEY}`)
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
