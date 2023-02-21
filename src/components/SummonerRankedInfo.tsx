'use client'

import React from 'react'
import Image from 'next/image'
import { useRankedStats } from '../hooks/useRankedStats'
import { queueTypes } from '../utils/config'
import { capitalizeFirstLetter } from '../utils/helpers'
import { Summoner } from '../utils/types'

interface Props {
  summoner: Summoner
}

const SummonerRankedInfo: React.FC<Props> = ({ summoner }) => {
  const { filter, queuStats, setFilter } = useRankedStats(summoner)

  return (
    <div className="flex flex-col flex-grow font-BeaufortBold">
      <div className="flex items-center justify-center flex-grow py-3 mt-4 bg-slate-4000 sm:justify-start">
        <div className="w-14 h-14 mr-3 border-[3px] rounded-full border-gold p-[2px] overflow-hidden">
          <Image
            src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/${summoner.profileIconId}.png`}
            width={56}
            height={56}
            className="rounded-full"
            alt="Summoners profile icon"
          />
        </div>
        <h1 className="text-2xl sm:text-4xl font-frizQuad text-gold-light ">{summoner.name}</h1>
        <p className="mt-2 ml-3 text-2xl text-text-highlight font-BeaufortBold">{summoner.summonerLevel}</p>
      </div>
      <div className="flex justify-center mt-6 mb-10 space-x-8 sm:mb-0 sm:justify-start font-BeaufortBold text-text-highlight">
        {summoner.rankedStats &&
          summoner.rankedStats.map((queue, i) => (
            <button key={i} onClick={() => setFilter(queue.queueType)}>
              {queueTypes[queue.queueType]}
            </button>
          ))}
      </div>

      <div>
        {queuStats && (
          <div className="flex flex-col items-center grid-cols-5 mb-10 sm:grid">
            <div className="col-span-3">
              <div>{new Date().getFullYear()} SEASON</div>
              <div className="flex mb-2 space-x-3 text-2xl text-text-highlight">
                <div>{queueTypes[filter]}</div>
                <div>-</div>
                <div>{queuStats.tier}</div>
                <div>{queuStats.rank}</div>
              </div>
              <div className="flex  items-center justify-between text-sm text-text-highlight border-t-[1px] border-b-[1px] py-2 border-neutral-700 border-t-border-light">
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

            <div className="grid col-span-2 ">
              <div className="flex flex-col items-center mt-6 sm:mt-0">
                <Image
                  src={`/ranked-emblems/Emblem_${
                    queuStats.tier ? capitalizeFirstLetter(queuStats.tier.toLocaleLowerCase()) : ''
                  }.png`}
                  width={200}
                  height={200}
                  quality={100}
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

export default SummonerRankedInfo
