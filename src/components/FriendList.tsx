'use client'

import Link from 'next/link'
import { useSummoners } from '@/hooks/useSummoners'
import React from 'react'
import SummonerIcon from './SummonerIcon/SummonerIcon'
import { Summoner } from '@prisma/client'

export default function FriendList() {
  const { summoners } = useSummoners()

  return (
    <section className="max-w-[16rem] overflow-y-auto sticky top-[5.2rem] mx-auto bg-background border-[1px] border-background-light rounded-sm p-2 ml-3">
      {summoners
        ?.slice()
        .sort((a: any, b: any) => a.name.localeCompare(b.name))
        .map((summoner: Summoner) => (
          <React.Fragment key={summoner.puuid}>
            <Link
              href={`grabb/${summoner.name}/matches`}
              className="flex items-center pl-2 rounded-sm cursor-pointer lg:pr-14 md:pr-2 hover:bg-slate-800 text-text-light hover:text-text-highlight"
            >
              <SummonerIcon size="medium" summoner={summoner} />
              <p className="flex-grow py-3 ml-2 font-BeaufortBold">{summoner.name}</p>
            </Link>
          </React.Fragment>
        ))}
    </section>
  )
}
