'use client'

import MatchHistoryList from '@/components/MatchHistoryList'
import { useGetMatchHistory } from '@/hooks/useGetMatchHistory'
import { useEffect, useState } from 'react'
import SummonerRankedInfo from '@/components/SummonerRankedInfo'
import ProfileInfo from '@/components/ProfileInfo'
import MatchesInfo from '@/components/MatchesInfo'
import MostPlayedChamps from '@/components/MostPlayedChamps'
import Loader from '@/components/Loader'

export default function GrusGrabb({ params }: any) {
  const [filter, setFilter] = useState('MATCH_HISTORY')
  const { matchHistory, summoner, mostPlayed, winRate, wins, isLoading, fetchAll, setFetchAll } = useGetMatchHistory(
    params?.name
  )

  useEffect(() => {
    if (summoner?.rankedStats.length < 1) {
      setFilter('MATCH_HISTORY')
    }
  }, [summoner])

  return (
    <>
      <div className="w-full">
        <div className="container px-3 pt-6 mb-6 space-x-8 text-text font-BeaufortBold md:mb-0 sm:px-0">
          <button
            autoFocus
            className="pb-1 border-b-2 border-transparent outline-none hover:text-text-highlight focus:border-text"
            onClick={() => setFilter('MATCH_HISTORY')}
          >
            MATCH HISTORY
          </button>

          {summoner?.rankedStats.length > 0 && (
            <button
              className="pb-1 border-b-2 border-transparent outline-none hover:text-text-highlight focus:border-text"
              onClick={() => setFilter('RANKED')}
            >
              RANKED
            </button>
          )}
        </div>

        <div className="container flex flex-row">
          <div className="flex flex-col flex-grow">
            {filter === 'MATCH_HISTORY' && (
              <>
                <div className="flex flex-col items-center md:flex-row">
                  <div className="flex flex-col justify-center h-full">
                    <ProfileInfo summoner={summoner} />

                    <div className="items-center hidden h-full gap-3 mt-2 font-BeaufortBold md:flex">
                      {wins && matchHistory && winRate && (
                        <MatchesInfo matchHistory={matchHistory} winRate={winRate} wins={wins} />
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-center mt-3 mb-3 text-sm md:ml-auto lg:mr-24">
                    <div className="flex flex-col items-center h-32 min-w-[15rem]">
                      {mostPlayed && <MostPlayedChamps mostPlayed={mostPlayed} />}
                    </div>
                  </div>

                  <div className="flex items-center justify-center h-full gap-3 mt-6 mb-3 font-BeaufortBold md:hidden">
                    {wins && matchHistory && winRate && (
                      <MatchesInfo matchHistory={matchHistory} winRate={winRate} wins={wins} />
                    )}
                  </div>
                </div>

                {matchHistory?.length <= 20 && (
                  <button
                    disabled={isLoading}
                    onClick={() => setFetchAll(true)}
                    className="px-2 py-1 pb-[0.3rem] mt-2 hover:border-text-light hover:text-text-highlight mr-auto text-sm leading-none border rounded border-text-diffuse"
                  >
                    Fetch all games since april 2022
                  </button>
                )}
              </>
            )}

            <div className="flex w-full">
              {isLoading ? (
                <div className="grid w-full h-[50vh] place-content-center">{isLoading && <Loader />}</div>
              ) : (
                <>
                  {summoner && matchHistory && filter === 'MATCH_HISTORY' && (
                    <MatchHistoryList matchHistory={matchHistory} summoner={summoner} isLoading={isLoading} />
                  )}
                </>
              )}
              {filter === 'RANKED' && summoner && <SummonerRankedInfo summoner={summoner} />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
