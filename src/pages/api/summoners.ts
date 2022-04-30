import { summoners } from '../../util/riotFetch'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getCollection } from '../../firebase/getCollection'
import { Summoner } from '../../util/types'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data: Array<Summoner> = await getCollection('summoners')
    const names = data.map(summoner => summoner.name)
    const resSummoners = await summoners(names)
    res.json(resSummoners)
}
