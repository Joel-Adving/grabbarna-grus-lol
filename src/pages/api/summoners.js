import { grusGrabb } from '../../util/constants'
import { summoners } from '../../util/riotFetch'

export default async function handler(req, res) {
    const resSummoners = await summoners(grusGrabb)
    res.json(resSummoners)
}
