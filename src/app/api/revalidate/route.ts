import { logRequestInfo } from '@/utils/helpers'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const path = url.searchParams.get('path')
  const tag = url.searchParams.get('tag')
  const key = url.searchParams.get('key')
  logRequestInfo(request)

  if (key !== process.env.UPDATE_GRABB) {
    return Response.json('access denied')
  }

  if (!path && !tag) {
    return Response.json({ message: 'path or tag required query param' })
  }

  if (path) {
    revalidatePath(path)
  }

  if (tag) {
    revalidateTag(tag)
  }

  let message

  if (path && tag) {
    message = `Path: '${path}', and tag: '${tag}' revalidated`
  } else if (tag) {
    message = `Tag: ${tag} revalidated`
  } else if (path) {
    message = `Path: ${path} revalidated`
  }

  return Response.json({ success: true, message })
}
