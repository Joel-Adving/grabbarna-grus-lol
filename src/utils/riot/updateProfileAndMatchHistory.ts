import { sleep } from '../helpers'
import { addRecentMatches } from './addRecentMatches'
import { updateSummonerProfile } from './updateSummonerProfile'

export async function updateProfileAndMatchHistory(name: string) {
  await addRecentMatches(name)
  await sleep(1100)
  await updateSummonerProfile(name)
}
