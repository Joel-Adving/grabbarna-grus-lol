'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Summoner } from '../utils/types'
import { useSummoners } from '@/hooks/useSummoners'
import React from 'react'

export default function FriendList() {
  const { summoners } = useSummoners()

  return (
    <section className="flex flex-col flex-grow max-w-[16rem] mx-auto bg-background border-[1px] border-background-light rounded-sm p-2 ml-3">
      {summoners
        ?.slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((summoner: Summoner) => (
          <React.Fragment key={summoner.puuid}>
            <Link passHref href={`grabb/${summoner.name}`}>
              <div className="flex items-center pl-2 cursor-pointer lg:pr-14 md:pr-2 hover:bg-slate-800 hover:text-text-highlight">
                <div className="mr-2 border-2 rounded-full w-8 h-8  border-gold p-[2px] overflow-hidden">
                  <Image
                    src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/${summoner.profileIconId}.png`}
                    alt="Summoner Icon"
                    width={32}
                    height={32}
                    className="rounded-full"
                    quality={50}
                  />
                </div>
                <p className="flex-grow py-3 text-text-light font-BeaufortBold">{summoner.name}</p>
              </div>
            </Link>
          </React.Fragment>
        ))}
    </section>
  )
}
