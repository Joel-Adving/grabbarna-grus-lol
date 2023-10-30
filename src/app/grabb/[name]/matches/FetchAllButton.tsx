'use client'
import { useIsLoadingMatchHistory } from '@/store'
import { Summoner } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

export default function FetchAllButton({ summoner }: { summoner: Summoner }) {
  const [isLoading] = useIsLoadingMatchHistory()

  if (isLoading) {
    return null
  }

  return (
    <Link
      href={`/grabb/${summoner.name}/matches?show=all`}
      className="px-2 py-1 text-sm border rounded hover:border-text-light hover:text-text-highlight border-text-diffuse"
    >
      Fetch all saved matches
    </Link>
  )
}
