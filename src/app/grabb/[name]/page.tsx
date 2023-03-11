'use client'

import MatchHistoryList from '@/components/MatchHistoryList'
import { useGetMatchHistory } from '@/hooks/useGetMatchHistory'
import { useEffect, useState } from 'react'
import SummonerRankedInfo from '@/components/SummonerRankedInfo'
import ProfileInfo from '@/components/ProfileInfo'
import MatchesInfo from '@/components/MatchesInfo'
import MostPlayedChamps from '@/components/MostPlayedChamps'
import Loader from '@/components/Loader'
import { SortBy, useFilterAndSortMatches } from '@/hooks/useFilterAndSortMatches'

export default function GrusGrabb({ params }: any) {
  const [view, setView] = useState('MATCH_HISTORY')
  const { matchHistory, summoner, mostPlayed, winRate, wins, isLoading, isValidating, setFetchAll, fetchAll } =
    useGetMatchHistory(params?.name)
  const { setSortBy, sortedMatchHistory } = useFilterAndSortMatches(matchHistory, summoner)

  useEffect(() => {
    if (summoner?.rankedStats.length < 1) setView('MATCH_HISTORY')
  }, [summoner])

  return (
    <>
      <div className="w-full">
        <div className="container px-3 pt-6 mb-6 space-x-8 text-text font-BeaufortBold md:mb-0 sm:px-0">
          <button
            autoFocus
            className="pb-1 border-b-2 border-transparent outline-none hover:text-text-highlight focus:border-text"
            onClick={() => setView('MATCH_HISTORY')}
          >
            MATCH HISTORY
          </button>

          {summoner?.rankedStats.length > 0 && (
            <button
              className="pb-1 border-b-2 border-transparent outline-none hover:text-text-highlight focus:border-text"
              onClick={() => setView('RANKED')}
            >
              RANKED
            </button>
          )}
        </div>

        <div className="container flex flex-row">
          <div className="flex flex-col flex-grow">
            {view === 'MATCH_HISTORY' && (
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

                <div className="flex gap-2 mx-auto mt-2 sm:mx-0 sm:mr-auto">
                  {matchHistory?.length <= 20 && (
                    <button
                      disabled={isLoading}
                      onClick={() => setFetchAll(true)}
                      className="px-2 py-1 text-sm border rounded hover:border-text-light hover:text-text-highlight border-text-diffuse"
                    >
                      Fetch all games since april 2022
                    </button>
                  )}

                  <select
                    onChange={(e) => setSortBy(e.target.value as SortBy)}
                    className="px-2 py-1 text-sm border rounded outline-none bg-background-darkest hover:border-text-light border-text-diffuse"
                  >
                    <option value="date">Date</option>
                    <option value="kills">Kills</option>
                    <option value="deaths">Deaths</option>
                    <option value="assists">Assists</option>
                    <option value="kda">K/D/A</option>
                    <option value="totalDamageDealt">Damage</option>
                    <option value="totalDamageDealtToChampions">Damage To Champions</option>
                    <option value="gameLength">Game Length</option>
                    <option value="champion">Champion</option>
                    <option value="gold">Gold</option>
                    <option value="soloKills">Solo Kills</option>
                    <option value="pentaKills">Penta Kills</option>
                    <option value="totalHeal">Total Healed</option>
                    <option value="totalMinionsKilled">Minions Killed</option>
                    <option value="skillshotsDodged">Skillshots Dodged</option>
                    <option value="perfectGame">Perfect Game</option>
                    <option value="snowballsHit">Snowballs Hit</option>
                  </select>
                </div>
              </>
            )}

            <div className="flex w-full">
              {isLoading || (isValidating && fetchAll) ? (
                <div className="grid w-full h-[50vh] place-content-center">
                  <Loader />
                </div>
              ) : (
                <>
                  {summoner && matchHistory && view === 'MATCH_HISTORY' && (
                    <MatchHistoryList matchHistory={sortedMatchHistory} summoner={summoner} />
                  )}
                </>
              )}
              {view === 'RANKED' && summoner && <SummonerRankedInfo summoner={summoner} />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
