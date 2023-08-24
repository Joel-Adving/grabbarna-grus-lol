import { Summoner } from '@/types'

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEVELOPMENT_URL
    : process.env.NEXT_PUBLIC_PRODUCTION_URL

async function getSummoners(): Promise<Summoner[]> {
  return await fetch(`${URL}/api/summoners`).then((res) => res.json())
}

export const api = {
  getSummoners
}
