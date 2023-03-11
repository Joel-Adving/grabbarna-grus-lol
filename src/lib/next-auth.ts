import { getServerSession } from 'next-auth/next'

export async function getSession() {
  return await getServerSession()
}

export async function getUser() {
  const session = await getSession()
  return session?.user
}
