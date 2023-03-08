import { updateSummonerProfile } from '@/utils/riot/updateSummonerProfile'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { param } = req.query

  //   const data = await updateSummonerProfile(param as string)

  res.status(200).json('hej')
}
