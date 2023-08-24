'use client'

import Link from 'next/link'
import SummonerIcon from './SummonerIcon/SummonerIcon'
import { useSortRanks } from '@/hooks/useSortRanks'
import { Summoner } from '@/types'

export default function RankList({ summoners }: { summoners: Summoner[] }) {
  const { sortedSummoners, sortBy, setSortBy } = useSortRanks(summoners)

  return (
    <section className="flex flex-col max-w-[30rem] sm:pb-20 pb-4 mx-auto font-BeaufortBold text-text-light">
      <div className="container flex justify-center mt-6 mb-8 space-x-8 text-text bg-background-darkest">
        <button
          className={`${sortBy === 'RANKED_FLEX_SR' ? 'border-text' : 'border-background-darkest'}  border-b-2`}
          onClick={() => setSortBy('RANKED_FLEX_SR')}
        >
          RANKED FLEX
        </button>
        <button
          className={`${sortBy === 'RANKED_SOLO_5x5' ? 'border-text' : 'border-background-darkest'}  border-b-2`}
          onClick={() => setSortBy('RANKED_SOLO_5x5')}
        >
          SOLO/DUO QUEUE
        </button>
      </div>
      <div className="flex items-center justify-between py-3 text-sm text-text-highlight border-b-[1px] px-3 border-t-[1px] border-zinc-600">
        <div className="flex ">
          <p className="w-3 mr-3 sm:mr-8">#</p>
          <p>SUMMONER</p>
        </div>
        {/* <p className="hidden sm:block">{queueTypes[sortBy]}</p> */}
        <div className="max-w-[9rem] sm:max-w-[12rem] flex justify-between flex-grow">
          <p className="">LEAGUE</p>
          <p className="flex w-10 ml-auto">W/L</p>
        </div>
      </div>

      <div className="relative max-h-[68dvh] sm:max-h-none pb-3 sm:pt-1 overflow-y-auto pt-2">
        {sortedSummoners?.map((player, i) => {
          return (
            <Link
              passHref
              href={`/grabb/${player.name}/matches`}
              key={player.id}
              className="flex items-center justify-between py-1.5 text-sm hover:bg-background-lightest px-3 hover:text-text-highlight"
            >
              <div className="flex items-center">
                <p className="w-3 mr-3 sm:mr-8">{i + 1}</p>
                <SummonerIcon size="small" summoner={player} />
                <p className="self-center ml-1.5">{player.name}</p>
              </div>

              {player.rankedStats && (
                <div className="flex flex-grow max-w-[9rem] sm:max-w-[12rem]">
                  <p>
                    {player.rankedStats.tier !== 'UNRANKED' ? player.rankedStats.tier : 'UNRANKED'}{' '}
                    {player.rankedStats.rank}
                  </p>
                  <span className="flex w-10 ml-auto">
                    <p className="text-victory">{player.rankedStats.wins}</p>
                    {player.rankedStats.rank ? '/' : ''}
                    <p className="">{player.rankedStats.losses}</p>
                  </span>
                </div>
              )}
            </Link>
          )
        })}
      </div>
    </section>
  )
}
