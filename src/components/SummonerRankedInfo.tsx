'use client'

import Image from 'next/image'
import { useRankedStats } from '../hooks/useRankedStats'
import { queueTypes } from '../constants'
import { capitalizeFirstLetter } from '../utils/helpers'
import ProfileInfo from './ProfileInfo'
import { useSummoner } from '@/hooks/useSummoner'
import { QueueType } from '@/types'

export default function SummonerRankedInfo({ name }: { name: string }) {
  const { summoner } = useSummoner(name)
  const { filter, queuStats, setFilter } = useRankedStats(summoner)

  return (
    <>
      <div className="flex font-BeaufortBold">
        <div className="w-full px-6 sm:px-0">
          {summoner && <ProfileInfo summoner={summoner} />}

          <div>
            <div className="flex justify-center gap-4 mb-8 mt-7 sm:mb-0 sm:justify-start font-BeaufortBold text-text-highlight">
              {summoner?.rankedStats?.map((queue, i) => {
                const queueType = queue.queueType as QueueType
                return (
                  <button key={i} onClick={() => setFilter(queueType)}>
                    {queueTypes[queueType]}
                  </button>
                )
              })}
            </div>

            {queuStats && (
              <div className="flex flex-col mt-6 sm:px-0 sm:flex-row">
                <div className="w-full col-span-3 sm:max-w-lg">
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
              </div>
            )}
          </div>
        </div>

        <div className="hidden sm:py-16 sm:pl-6 lg:pr-10 sm:block">
          {queuStats && <RankBadge queuStats={queuStats} />}
        </div>
      </div>
      <div className="flex items-center justify-center mt-6 sm:hidden">
        {queuStats && <RankBadge queuStats={queuStats} />}
      </div>
    </>
  )
}

function RankBadge({ queuStats }: { queuStats: any }) {
  return (
    <div className="flex flex-col items-center w-full max-w-lg mb-12 sm:mb-0">
      <Image
        src={`/ranked-emblems/Emblem_${
          queuStats.tier ? capitalizeFirstLetter(queuStats.tier.toLocaleLowerCase()) : ''
        }.webp`}
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
  )
}
