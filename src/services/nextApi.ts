import { LeagueMatch, Summoner } from '@/types'
import { Get } from '@/utils/helpers'

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEVELOPMENT_URL ?? ''
    : process.env.NEXT_PUBLIC_PRODUCTION_URL ?? ''

const get = Get(BASE_URL + '/api/')

async function getSummoners(): Promise<Summoner[]> {
  return await get(`summoners`, { next: { tags: ['summoners'] } })
}

async function getSummonerByName(name: string): Promise<Summoner> {
  return await get(`summoners/name/${name}`)
}

async function getMatchHistory(name: string, fetchAll: boolean = false): Promise<LeagueMatch[]> {
  return await get(`matchHistory/name/${name}?fetchAll=${fetchAll}`)
}

async function addNewSummoner(name: string, key: string) {
  return await get(`add-summoner/${name}?key=${key}`)
}

export const nextApi = {
  getSummoners,
  getMatchHistory,
  getSummonerByName,
  addNewSummoner
}
