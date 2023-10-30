import MatchHistoryList from '@/components/MatchHistoryList'
import MatchesInfo from '@/components/MatchesInfo'
import MostPlayedChamps from '@/components/MostPlayedChamps'
import ProfileInfo from '@/components/ProfileInfo'
import { nextApi } from '@/services/nextApi'
import { riotApi } from '@/services/riotApi'
import FetchAllButton from './FetchAllButton'
import SortBy from './SortBy'
import { Suspense } from 'react'

export const revalidate = 3600 // 1 hour

export async function generateStaticParams() {
  const summoners = await nextApi.getSummoners()
  return summoners.map((summoner) => ({
    name: summoner.name
  }))
}

export default async function MatchHistoryPage({ params }: { params: { name: string } }) {
  const [summoner, matchHistory, queueTypes] = await Promise.all([
    nextApi.getSummonerByName(params.name),
    nextApi.getMatchHistory(params.name),
    riotApi.getQueueTypes()
  ])

  return (
    <div className="grid w-full">
      <div className="flex flex-col items-center md:flex-row">
        <div className="flex flex-col justify-center h-full mb-auto">
          <ProfileInfo summoner={summoner} />

          <div className="items-center hidden h-full gap-3 mt-2 font-BeaufortBold md:flex">
            <Suspense fallback={null}>
              <MatchesInfo summoner={summoner} matchHistory={matchHistory} />
            </Suspense>
          </div>
        </div>

        <div className="flex flex-col items-center mt-3 mb-3 text-sm md:ml-auto lg:mr-24">
          <div className="flex flex-col items-center h-32 min-w-[15rem]">
            <Suspense fallback={null}>
              <MostPlayedChamps summoner={summoner} matchHistory={matchHistory} />
            </Suspense>
          </div>
        </div>

        <div className="flex items-center justify-center h-full gap-3 mt-6 mb-3 font-BeaufortBold md:hidden">
          <Suspense fallback={null}>
            <MatchesInfo summoner={summoner} matchHistory={matchHistory} />
          </Suspense>
        </div>
      </div>

      <div className="flex gap-2 mx-auto mt-2 sm:mx-0 sm:mr-auto">
        <Suspense fallback={null}>
          <FetchAllButton summoner={summoner} />
          <SortBy />
        </Suspense>
      </div>

      <div className="flex w-full">
        <Suspense fallback={null}>
          <MatchHistoryList summoner={summoner} matchHistory={matchHistory} queueTypes={queueTypes} />
        </Suspense>
      </div>
    </div>
  )
}
