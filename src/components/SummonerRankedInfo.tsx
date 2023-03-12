'use client'

import Image from 'next/image'
import { useRankedStats } from '../hooks/useRankedStats'
import { queueTypes } from '../constants'
import { capitalizeFirstLetter } from '../utils/helpers'
import ProfileInfo from './ProfileInfo'
import { RankedStats, Summoner } from '@prisma/client'

export type FullSummonerProfile = Summoner & {
  rankedStats: RankedStats[]
}

export default function SummonerRankedInfo({ summoner }: { summoner: FullSummonerProfile }) {
  const { filter, queuStats, setFilter } = useRankedStats(summoner)

  return (
    <div className="flex flex-col flex-grow font-BeaufortBold">
      <ProfileInfo summoner={summoner} />
      <div className="flex justify-center mt-2 mb-10 space-x-8 sm:mb-0 sm:justify-start font-BeaufortBold text-text-highlight">
        {summoner.rankedStats &&
          summoner.rankedStats.map((queue, i) => (
            <button key={i} onClick={() => setFilter(queue.queueType)}>
              {queueTypes[queue.queueType]}
            </button>
          ))}
      </div>

      <div>
        {queuStats && (
          <div className="flex flex-col px-6 mt-6 sm:px-0 sm:flex-row">
            <div className="w-full max-w-md col-span-3">
              <div>{new Date().getFullYear()} SEASON</div>
              <div className="flex mb-2 space-x-3 text-2xl text-text-highlight">
                <div>{queueTypes[filter]}</div>
                <div>-</div>
                <div>{queuStats.tier}</div>
                <div>{queuStats.rank}</div>
              </div>
              <div className="flex items-center justify-between text-sm text-text-highlight border-t-[1px] border-b-[1px] py-2 border-neutral-700 border-t-border-light">
                <div className="flex">
                  <p className="mr-10">#</p>
                  <p className="mr-10">SUMMONER</p>
                </div>
                <div className="flex mr-6">
                  <p className="mr-10">W/L</p>
                  <p className="">POINTS</p>
                </div>
              </div>
              <div className="flex justify-between col-span-3 py-3">
                <div className="flex">
                  <div>1</div>
                  <div className="ml-10">{queuStats.summonerName}</div>
                </div>
                <div className="flex">
                  <div className="mr-14">
                    <span className="text-victory">{queuStats.wins}</span>
                    {queuStats.wins ? '/' : ''}
                    <span className="">{queuStats.losses}</span>
                  </div>
                  <div className="mr-10">{queuStats.leaguePoints}</div>
                </div>
              </div>
            </div>

            <div className="grid col-span-2 mx-auto">
              <div className="flex flex-col items-center mt-6 sm:mt-0">
                <Image
                  src={`/ranked-emblems/Emblem_${
                    queuStats.tier ? capitalizeFirstLetter(queuStats.tier.toLocaleLowerCase()) : ''
                  }.png`}
                  width={200}
                  height={200}
                  alt={''}
                />
                <div className="flex mt-2 text-2xl text-text-highlight">
                  <div className="mr-1">{queuStats.tier}</div>
                  <div>{queuStats.rank}</div>
                </div>
                <div>{queuStats.leaguePoints} LP</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
