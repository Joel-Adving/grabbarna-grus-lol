'use client'

import { LEAGUE_CDN } from '@/constants'
import { useGetMatchHistory } from '@/hooks/useGetMatchHistory'
import { LeagueMatch, Summoner } from '@/types'
import { Match } from '@prisma/client'
import Image from 'next/image'

export default function MostPlayedChamps({
  matchHistory,
  summoner
}: {
  matchHistory: LeagueMatch[]
  summoner: Summoner
}) {
  const { mostPlayed } = useGetMatchHistory(summoner, matchHistory)

  if (!mostPlayed) {
    return null
  }

  return (
    <>
      <h3 className="mb-2 font-BeaufortBold text-text-highlight">MOST PLAYED CHAMPIONS</h3>
      <div className="flex gap-4">
        {[...mostPlayed.keys()].map((champ: string, i) => (
          <div key={i}>
            <Image
              src={`${LEAGUE_CDN}/img/champion/${champ}.png`}
              height={64}
              width={64}
              priority
              className="border-[1px] border-gray-600 overflow-hidden"
              alt="Recently played champion"
            />
            <p className="mt-3 text-center font-BeaufortBold text-gold-light">{mostPlayed.get(champ)}%</p>
          </div>
        ))}
      </div>
    </>
  )
}
