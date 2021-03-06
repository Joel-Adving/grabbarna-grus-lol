import MatchHistoryList from '../../components/MatchHistoryList'
import FriendList from '../../components/FriendList'
import Image from 'next/image'
import { NextPage } from 'next'
import { useGetMatchHistory } from '../../hooks/useGetMatchHistory'
import { useGetMatchHistoryStats } from '../../hooks/useGetMatchHistoryStats'
import { useEffect, useState } from 'react'
import SummonerRankedInfo from '../../components/SummonerRankedInfo'

export const GrusGrabb: NextPage = () => {
    const { matchHistory, summoner, loading } = useGetMatchHistory()
    const { stats } = useGetMatchHistoryStats()
    const [filter, setFilter] = useState('MATCH_HISTORY')

    useEffect(() => {
        if (!summoner) return
        if (summoner.rankedStats.length < 1) {
            setFilter('MATCH_HISTORY')
        }
    }, [summoner])

    return (
        <>
            {!loading && (
                <div className="min-h-screen bg-gradient-to-b from-background-darkest via-background-background to-background">
                    <div className="container px-3 pt-3 mb-6 space-x-8 text-text font-BeaufortBold md:mb-0 sm:px-0">
                        <button onClick={() => setFilter('MATCH_HISTORY')}>MATCH HISTORY</button>
                        {summoner && summoner.rankedStats.length > 0 && (
                            <button onClick={() => setFilter('RANKED')}>RANKED</button>
                        )}
                        {/* <button onClick={() => setFilter('STATS')}>STATS</button> */}
                    </div>
                    <div className="container flex flex-row">
                        <div className="flex flex-col flex-grow">
                            {matchHistory && summoner && filter === 'MATCH_HISTORY' && (
                                <div className="flex flex-col items-center md:flex-row">
                                    <div className="flex flex-col justify-center h-full">
                                        <div className="flex items-center justify-center flex-grow py-3 my-4 border-b-2 border-border bg-slate-4000 sm:justify-start">
                                            <div className="w-14 h-14 mr-3 border-[3px] rounded-full border-gold p-[2px] overflow-hidden">
                                                <Image
                                                    src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/${summoner.profileIconId}.png`}
                                                    width={56}
                                                    height={56}
                                                    className="rounded-full"
                                                    alt="Summoners profile icon"
                                                />
                                            </div>
                                            <h1 className="text-4xl font-frizQuad text-gold-light ">
                                                {summoner.name}
                                            </h1>
                                            <p className="mt-2 ml-3 text-2xl text-text-highlight font-BeaufortBold">
                                                {summoner.summonerLevel}
                                            </p>
                                        </div>

                                        <div className="hidden mt-2 font-BeaufortBold md:flex ">
                                            <h2 className=" text-text-highlight">
                                                RECENT GAMES (LAST 20 PLAYED)
                                            </h2>
                                            {stats && (
                                                <div className="flex ml-3">
                                                    <h3 className="text-victory ">
                                                        {stats?.wins.length}
                                                    </h3>
                                                    <span className="mx-1">/</span>
                                                    <h3 className=" text-defeat">
                                                        {20 - stats?.wins.length}
                                                    </h3>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center mt-3 mb-3 text-sm md:ml-auto lg:mr-24">
                                        {stats && (
                                            <>
                                                <h3 className="mb-2 font-BeaufortBold text-text-highlight">
                                                    RECENTLY PLAYED CHAMPIONS
                                                </h3>
                                                <div className="flex gap-4 ">
                                                    {Object.entries(stats.recentChamps).map(
                                                        ([key, value]: any, i) => (
                                                            <div key={i}>
                                                                <div className="w-16 h-16 border-[1px] border-gray-600 overflow-hidden">
                                                                    <Image
                                                                        src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/${key}.png`}
                                                                        height={64}
                                                                        width={64}
                                                                        alt="Recently played champion"
                                                                    />
                                                                </div>
                                                                <p className="mt-3 text-center font-BeaufortBold text-gold-light">
                                                                    {value}%
                                                                </p>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="flex justify-center mt-6 mb-3 font-BeaufortBold md:hidden">
                                        <h2 className=" text-text-highlight">
                                            RECENT GAMES (LAST 20 PLAYED)
                                        </h2>

                                        {stats && (
                                            <div className="flex ml-3">
                                                <h3 className="text-victory ">
                                                    {stats?.wins.length}
                                                </h3>
                                                <span className="mx-1">/</span>
                                                <h3 className=" text-defeat">
                                                    {20 - stats?.wins.length}
                                                </h3>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="flex w-full">
                                {summoner && matchHistory && filter === 'MATCH_HISTORY' && (
                                    <MatchHistoryList
                                        matchHistory={matchHistory}
                                        summoner={summoner}
                                    />
                                )}
                                {filter === 'RANKED' && summoner && (
                                    <SummonerRankedInfo summoner={summoner} />
                                )}
                            </div>
                        </div>
                        <div className="hidden mt-6 md:block md:ml-auto">
                            <FriendList />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default GrusGrabb
