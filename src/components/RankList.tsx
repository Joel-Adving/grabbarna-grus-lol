import { leagueRanks, leagueTiers, rankColors } from '../util/config'
import Image from 'next/image'
import React from 'react'

interface Props {
    data: Array<any>
}

const RankList: React.FC<Props> = props => {
    const { data } = props
    const players = data.map(player => ({
        ...player,
        formattedRanks: player.rankedStats.length
            ? player.rankedStats.find((el: any) => el.queueType === 'RANKED_FLEX_SR')
            : { queueType: 'RANKED_FLEX_SR', tier: 'UNRANKED' },
    }))

    const sortedPlayers = players
        .slice()
        .sort((a, b) => leagueRanks[a.formattedRanks.rank] - leagueRanks[b.formattedRanks.rank])
        .sort((a, b) => leagueTiers[a.formattedRanks.tier] - leagueTiers[b.formattedRanks.tier])

    return (
        <section className="border-t-[1px] border-zinc-600 max-w-2xl pb-20 mx-auto font-BeaufortBold text-text-light pt-3">
            <div className="flex items-center justify-between pb-3 text-sm text-text-highlight border-b-[1px] border-zinc-600 px-3">
                <div className="flex ">
                    <p className="w-3 mr-3 sm:mr-16">#</p>
                    <p>GRUSGRABBAR</p>
                </div>
                <div className="flex">
                    <p className="mr-3 sm:mr-16">LEAGUE</p>
                    <p className="ml-1.5 mr-1.5">W/L</p>
                </div>
            </div>
            {sortedPlayers.map((player, i) => {
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

                        <div className="flex ">
                            <p className={`  text-${rankColors[player.formattedRanks.tier]}`}>
                                {player.formattedRanks.tier !== 'UNRANKED' ? player.formattedRanks.tier : ''}{' '}
                                {player.formattedRanks.rank}
                            </p>
                            <p className="w-5 ml-3 mr-5 sm:ml-14 ">
                                <span className="text-victory">{player.formattedRanks.wins}</span>
                                {player.formattedRanks.rank ? '/' : ''}
                                <span className="">{player.formattedRanks.losses}</span>
                            </p>
                        </div>
                    </a>
                )
            })}
        </section>
    )
}

export default RankList
