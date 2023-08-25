'use client'

import { LEAGUE_CDN } from '../../constants'
import { LeagueMatch, Summoner } from '../../types'
import Image from 'next/image'
import Link from 'next/link'
import Items from '../Items'
import SummonerSpell from '../SummonerSpell'
import { useGetQueueTypes } from '@/hooks/useGetQueueTypes'

const formatDate = (int: number) => {
  const date = new Date(int)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

interface Props {
  matchHistory: LeagueMatch[]
  summoner: Summoner
  queueTypes: any
}

export default function MatchHistoryList({ matchHistory, summoner, queueTypes }: Props) {
  const { queues } = useGetQueueTypes(queueTypes)

  if (!matchHistory || !summoner) {
    return null
  }

  return (
    <section className="flex flex-col flex-grow pt-4">
      {matchHistory.map((match) => {
        const { info } = match
        if (!info) return null
        const playerStats = info?.participants.find((el) => el.puuid === summoner.puuid)
        if (!playerStats) return null
        const win = playerStats?.win
        const gameType = queues?.find((queue: any) => queue.queueId === info.queueId)?.description
        const map = queues?.find((queue: any) => queue.queueId === info.queueId)?.map

        return (
          <Link
            href={`/match/${match.metaData.matchId}?summoner=${summoner.name}`}
            className="py-3 border-[1px] border-transparent border-b-neutral-700 border-r-0  text-text-light flex sm:justify-between justify-evenly hover:bg-gray-900  hover:border-gold hover:border-l-gold border-l-[5px] hover:pl-2.5 transition-all duration-75 hover:cursor-pointer"
            key={match.info.gameId}
          >
            <div className="flex flex-col items-center sm:flex-row">
              <div className="relative">
                <div className="w-14 h-14 border-border rounded-full border-[2.5px] overflow-hidden">
                  <Image
                    src={`${LEAGUE_CDN}/img/champion/${playerStats.championName}.png`}
                    alt="Champion splash art"
                    height={56}
                    width={56}
                    className="rounded-full"
                    quality={60}
                  />
                </div>

                <p className="h-5 w-5 absolute bottom-0 right-0 rounded-full border-gold border-[1px] text-xs font-BeaufortBold bg-background-darkest flex items-center justify-center">
                  {playerStats?.champLevel}
                </p>
              </div>
              <div className="flex flex-col items-center mt-3 sm:items-start sm:ml-5 sm:mt-0">
                {win ? (
                  <h2 className=" text-victory font-BeaufortBold">VICTORY</h2>
                ) : (
                  <h2 className=" text-defeat font-BeaufortBold">DEFEAT</h2>
                )}
                <p className="-mt-1 text-xs text-center sm:text-left">{gameType ? gameType : info.gameMode}</p>

                <div className="flex mt-2">
                  <SummonerSpell summonerSpellId={playerStats.summoner1Id} />
                  <SummonerSpell summonerSpellId={playerStats.summoner2Id} />
                </div>
              </div>
            </div>
            <div className="flex flex-col-reverse items-center justify-center mr-0 lg:mr-24 sm:flex-row">
              <div className="sm:mr-8 ">
                <Items playerStats={playerStats} />
                <div className="flex justify-between mt-1.5 -mb-1.5 font-BeaufortBold">
                  <div className="flex">
                    <p>{playerStats.kills}</p>
                    <span className="mx-1">/</span>
                    <p>{playerStats.deaths}</p>
                    <span className="mx-1">/</span>
                    <p>{playerStats.assists}</p>
                  </div>
                  <div className="flex">
                    <p>{playerStats.totalMinionsKilled}</p>
                    <div></div>
                  </div>
                  <div className="flex">
                    <p>{playerStats?.goldEarned.toString().replace(/.(?=(..)*...$)/g, '$&,')}</p>
                    <div></div>
                  </div>
                </div>
              </div>

              <div className="self-start mb-3 sm:mb-0">
                <p className="text-xs">{map}</p>
                <div className="flex gap-3 mt-1 text-xs sm:mt-2 ">
                  <p>{(info.gameDuration / 60).toFixed(2).toString().replace('.', ':')}</p>
                  <p>{formatDate(info.gameEndTimestamp)}</p>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </section>
  )
}
