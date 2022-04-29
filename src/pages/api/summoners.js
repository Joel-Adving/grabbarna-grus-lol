import { grusGrabbar } from '../../util/constants'
import { summoners } from '../../util/riotFetch'

export default async function handler(req, res) {
    const resSummoners = await summoners(grusGrabbar)
    res.json(resSummoners)
}
