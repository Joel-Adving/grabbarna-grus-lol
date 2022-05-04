import { queueTypes } from '../util/config'
import Image from 'next/image'
import React from 'react'
import { useFilterRanks } from '../hooks/useFilterRanks'

interface Props {
    summoners: Array<any>
}

const RankList: React.FC<Props> = ({ summoners }) => {
    const { sortedSummoners, filter, setFilter } = useFilterRanks(summoners)

    return (
        <section className="flex flex-col max-w-2xl pb-20 mx-auto font-BeaufortBold text-text-light">
            <div className="self-center mb-6 space-x-8 text-text">
                <button onClick={() => setFilter('RANKED_FLEX_SR')}>RANKED FLEX</button>
                <button onClick={() => setFilter('RANKED_SOLO_5x5')}>SOLO/DUO QUEUE</button>
            </div>
            <div className="flex items-center justify-between py-3 text-sm text-text-highlight border-b-[1px] px-3 border-t-[1px] border-zinc-600">
                <div className="flex ">
                    <p className="w-3 mr-3 sm:mr-16">#</p>
                    <p>GRUSGRABBAR</p>
                </div>
                <p className="hidden sm:block">{queueTypes[filter]}</p>
                <div className="max-w-[9rem] sm:max-w-[12rem] flex justify-between flex-grow">
                    <p className="">LEAGUE</p>
                    <p className="flex w-10 ml-auto">W/L</p>
                </div>
            </div>
            {sortedSummoners.length &&
                sortedSummoners.map((player, i) => {
                    return (
                        <a
                            href={'/grabb/' + player.name}
                            key={player.id}
                            className="flex items-center justify-between py-1.5 text-sm hover:bg-background-lightest px-3 hover:text-text-highlight"
                        >
                            <div className="flex items-center">
                                <p className="w-3 mr-3 sm:mr-16">{i + 1}</p>
                                <div className="mr-2 border-2 rounded-full w-6 h-6  border-gold p-[1px] overflow-hidden">
                                    <Image
                                        src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/${player.profileIconId}.png`}
                                        alt="Summoner Icon"
                                        width={24}
                                        height={24}
                                        className="rounded-full"
                                    />
                                </div>
                                <p>{player.name}</p>
                            </div>

                            {player.rankedStats && (
                                <div className="flex flex-grow max-w-[9rem] sm:max-w-[12rem]">
                                    <p>
                                        {player.rankedStats.tier !== 'UNRANKED' ? player.rankedStats.tier : 'UNRANKED'}{' '}
                                        {player.rankedStats.rank}
                                    </p>
                                    <p className="flex w-10 ml-auto">
                                        <p className="text-victory">{player.rankedStats.wins}</p>
                                        {player.rankedStats.rank ? '/' : ''}
                                        <p className="">{player.rankedStats.losses}</p>
                                    </p>
                                </div>
                            )}
                        </a>
                    )
                })}
        </section>
    )
}

export default RankList
