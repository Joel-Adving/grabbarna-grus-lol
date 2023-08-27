'use client'

import Loader from '@/components/Loader'
import MatchesInfo from '@/components/MatchesInfo'
import MostPlayedChamps from '@/components/MostPlayedChamps'
import ProfileInfo from '@/components/ProfileInfo'
import { SortBy, useFilterAndSortMatches } from '@/hooks/useFilterAndSortMatches'
import { useGetMatchHistory } from '@/hooks/useGetMatchHistory'
import MatchHistoryList from './MatchHistoryList'
import { useRouter } from 'next/navigation'
import { Summoner } from '@/types'

const selectOptions = [
  { value: 'date', label: 'Date' },
  { value: 'kills', label: 'Kills' },
  { value: 'deaths', label: 'Deaths' },
  { value: 'assists', label: 'Assists' },
  { value: 'kda', label: 'K/D/A' },
  { value: 'totalDamageDealt', label: 'Damage' },
  { value: 'totalDamageDealtToChampions', label: 'Damage To Champions' },
  { value: 'gameLength', label: 'Game Length' },
  { value: 'championId', label: 'Champion' },
  { value: 'goldEarned', label: 'Gold' },
  { value: 'soloKills', label: 'Solo Kills' },
  { value: 'pentaKills', label: 'Penta Kills' },
  { value: 'totalHeal', label: 'Total Healed' },
  { value: 'totalMinionsKilled', label: 'Minions Killed' },
  { value: 'skillshotsDodged', label: 'Skillshots Dodged' },
  { value: 'snowballsHit', label: 'Snowballs Hit' }
]

export default function MatchHistory({
  serverSideSummoner,
  serverSideMatchHistory,
  queueTypes
}: {
  serverSideSummoner: Summoner
  serverSideMatchHistory: any
  queueTypes: any
}) {
  const { matchHistory, summoner, mostPlayed, winRate, wins, isLoading, isValidating, fetchAll } = useGetMatchHistory(
    serverSideSummoner,
    serverSideMatchHistory
  )
  const { setSortBy, sortedMatchHistory } = useFilterAndSortMatches(matchHistory, summoner)
  const router = useRouter()

  return (
    <div className="grid w-full">
      <div className="flex flex-col items-center md:flex-row">
        <div className="flex flex-col justify-center h-full mb-auto">
          {summoner && <ProfileInfo summoner={summoner} />}

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
          {wins && matchHistory && winRate && <MatchesInfo matchHistory={matchHistory} winRate={winRate} wins={wins} />}
        </div>
      </div>

      <div className="flex gap-2 mx-auto mt-2 sm:mx-0 sm:mr-auto">
        {matchHistory?.length <= 20 && !isLoading && (
          <button
            onClick={() => router.push(`/grabb/${summoner.name}/matches?show=all`)}
            className="px-2 py-1 text-sm border rounded hover:border-text-light hover:text-text-highlight border-text-diffuse"
          >
            Fetch all saved matches
          </button>
        )}

        {matchHistory?.length > 0 && (
          <select
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="px-2 py-1 text-sm border rounded outline-none bg-background-darkest hover:border-text-light border-text-diffuse"
          >
            {selectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="flex w-full">
        {isLoading || (isValidating && fetchAll) ? (
          <div className="grid w-full sm:h-[40vh] h-[25vh] place-content-center">
            <Loader />
          </div>
        ) : (
          summoner &&
          matchHistory && (
            <MatchHistoryList matchHistory={sortedMatchHistory} summoner={summoner} queueTypes={queueTypes} />
          )
        )}
      </div>
    </div>
  )
}
