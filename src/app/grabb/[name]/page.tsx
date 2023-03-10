'use client'

import MatchHistoryList from '@/components/MatchHistoryList'
import Image from 'next/image'
import { useGetMatchHistory } from '@/hooks/useGetMatchHistory'
import { useCallback, useEffect, useState } from 'react'
import SummonerRankedInfo from '@/components/SummonerRankedInfo'
import ProfileInfo from '@/components/ProfileInfo'

export default function GrusGrabb({ params }: any) {
  const [filter, setFilter] = useState('MATCH_HISTORY')
  const { matchHistory, summoner, mostPlayed, winRate, wins, setSize, isLoading } = useGetMatchHistory(params?.name)

  const handleScroll = useCallback(
    (e: any) => {
      if (isLoading) return
      if (
        window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight &&
        filter === 'MATCH_HISTORY'
      ) {
        setSize((prev) => prev + 1)
      }
    },
    [filter, isLoading, setSize]
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

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
            className={`pb-1 border-b-2 border-transparent outline-none hover:text-text-highlight focus:border-text`}
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
              <div className="flex flex-col items-center md:flex-row">
                <div className="flex flex-col justify-center h-full">
                  <ProfileInfo summoner={summoner} />

                  <div className="hidden h-full gap-3 mt-2 font-BeaufortBold md:flex">
                    {wins && matchHistory && winRate && (
                      <>
                        <h2 className="text-text-highlight">GAMES PLAYED</h2>
                        <p className="text-text-highlight">{matchHistory.length}</p>
                        <p>-</p>
                        <p className={`${winRate >= 50 ? 'text-victory' : 'text-defeat'}`}>{winRate}%</p>
                        <p>-</p>
                        <div className="flex">
                          <p className="text-victory ">{wins.length}</p>
                          <span className="mx-1">/</span>
                          <p className=" text-defeat">{matchHistory.length - wins.length}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-center mt-3 mb-3 text-sm md:ml-auto lg:mr-24">
                  <div className="flex flex-col items-center h-32 min-w-[15rem]">
                    <h3 className="mb-2 font-BeaufortBold text-text-highlight">MOST PLAYED CHAMPIONS</h3>
                    <div className="flex gap-4">
                      {mostPlayed &&
                        [...mostPlayed.keys()].map((key: string, i) => (
                          <div key={i}>
                            <Image
                              src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/${key}.png`}
                              height={64}
                              width={64}
                              className="border-[1px] border-gray-600 overflow-hidden"
                              alt="Recently played champion"
                            />
                            <p className="mt-3 text-center font-BeaufortBold text-gold-light">{mostPlayed.get(key)}%</p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center h-full gap-3 mt-6 mb-3 font-BeaufortBold md:hidden">
                  {wins && matchHistory && winRate && (
                    <>
                      <h2 className="text-text-highlight">GAMES PLAYED</h2>
                      <p className="text-text-highlight">{matchHistory.length}</p>
                      <p>-</p>
                      <p className={`${winRate >= 50 ? 'text-victory' : 'text-defeat'}`}>{winRate}%</p>
                      <p>-</p>
                      <div className="flex">
                        <h3 className="text-victory ">{wins.length}</h3>
                        <span className="mx-1">/</span>
                        <h3 className=" text-defeat">{matchHistory.length - wins.length}</h3>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="flex w-full">
              {summoner && matchHistory && filter === 'MATCH_HISTORY' && (
                <MatchHistoryList matchHistory={matchHistory} summoner={summoner} />
              )}
              {filter === 'RANKED' && summoner && <SummonerRankedInfo summoner={summoner} />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
