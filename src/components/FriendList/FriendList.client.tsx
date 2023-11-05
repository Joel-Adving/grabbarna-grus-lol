'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import SummonerIcon from '../SummonerIcon'
import { Summoner } from '@prisma/client'

export default function FriendListItem({ summoner }: { summoner: Summoner }) {
  const router = useRouter()

  return (
    <Link
      href={`/grabb/${summoner.name}/matches`}
      prefetch={false}
      onMouseOver={() => router.prefetch(`/grabb/${summoner.name}/matches`)}
      className="flex items-center pl-2 rounded-sm cursor-pointer lg:pr-14 md:pr-2 hover:bg-slate-800 text-text-light hover:text-text-highlight"
    >
      <SummonerIcon size="medium" summoner={summoner} />
      <p className="flex-grow py-3 ml-2 font-BeaufortBold">{summoner.name}</p>
    </Link>
  )
}
