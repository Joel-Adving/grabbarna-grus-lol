import { logRequestInfo } from '@/utils/helpers'
import { NextApiRequest, NextApiResponse } from 'next'
import { revalidatePath, revalidateTag } from 'next/cache'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  logRequestInfo(req)

  if (req.query.key !== process.env.UPDATE_GRABB) {
    return res.json('access denied')
  }

  const path = req.query.path as string
  const tag = req.query.tag as string

  if (!path && !tag) {
    return res.status(200).json({ message: 'path or tag required query param' })
  }

  if (path) {
    revalidatePath(path)
  }

  if (tag) {
    revalidateTag(tag)
  }

  let message

  if (path && tag) {
    message = `Path ${path} and tag ${tag} revalidated`
  } else if (tag) {
    message = `Tag ${tag} revalidated`
  } else if (path) {
    message = `Path ${path} revalidated`
  }

  return res.status(200).json({ success: true, message })
}
