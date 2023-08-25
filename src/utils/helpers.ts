import { Summoner } from '@/types'

async function get(url: string) {
  try {
    const res = await fetch(url)
    return await res.json()
  } catch (e) {
    console.log(e)
  }
}

function Get(baseUrl: string) {
  return async function get(url: string) {
    try {
      const res = await fetch(baseUrl + url)
      return await res.json()
    } catch (e) {
      console.log(e)
    }
  }
}

function sleep(ms: number) {
  return new Promise((r) => {
    setTimeout(r, ms)
  })
}

function findSummonerByName(summoners: Summoner[], name: string) {
  return summoners?.find((summoner) => summoner.name.toLowerCase() === name.toLowerCase())
}

function findSummonerById(summoners: any[], summonerId: string) {
  return summoners.find((summoner) => summoner.summonerId === summonerId)
}

function logRequestInfo(req: any) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  const date = new Date()
  const formattedDate = `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`
  console.log({ ip, at: formattedDate })
}

function percentages(arr: Array<any>) {
  return arr?.reduce((el, i) => ({ ...el, [i]: Math.trunc((el[i] || 0) + 100 / arr.length) }), {})
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export { get, sleep, findSummonerByName, findSummonerById, logRequestInfo, percentages, capitalizeFirstLetter, Get }
