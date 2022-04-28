import { summonerSpells } from '../util/constants'
import Image from 'next/image'

export default function MatchHistoryList({ matchHistory, summoner }) {
    return (
        <section className="flex flex-col flex-grow py-4 pb-20">
            {matchHistory
                .filter(match => match.info)
                .map((match, i) => {
                    const { info } = match
                    const playerStats = info.participants.find(el => el.summonerId === summoner.id)
                    const win = playerStats.win
                    let gameType

                    if (info.gameMode === 'CLASSIC') gameType = 'Classic (Ranked/Normal)'
                    if (info.gameType === 'TUTORIAL_GAME') gameType = 'Tutorial'
                    if (match.metadata.participants.length < 10) gameType = 'Beginner'
                    if (info.gameType === 'CUSTOM_GAME') gameType = 'Custom'

                    return (
                        <div
                            className="py-3 border-b-[1px] border-neutral-700 text-text-light flex sm:justify-between justify-evenly cursor-pointer"
                            key={match.info.gameId}
                        >
                            <div className="flex flex-col items-center sm:flex-row">
                                <div className="relative">
                                    <div className="w-14 h-14 border-border rounded-full border-[2.5px] overflow-hidden">
                                        <Image
                                            src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/${playerStats.championName}.png`}
                                            alt="Champion splash art"
                                            height={56}
                                            width={56}
                                            className="rounded-full"
                                        />
                                    </div>

                                    <p className="h-5 w-5 absolute bottom-0 right-0 rounded-full border-gold border-[1px] text-xs font-BeaufortBold bg-background-darkest flex items-center justify-center">
                                        {playerStats.champLevel}
                                    </p>
                                </div>
                                <div className="flex flex-col items-center mt-3 sm:items-start sm:ml-5 sm:mt-0">
                                    {win ? (
                                        <h2 className=" text-victory font-BeaufortBold">VICTORY</h2>
                                    ) : (
                                        <h2 className=" text-defeat font-BeaufortBold">DEFEAT</h2>
                                    )}
                                    <p className="-mt-1 text-xs">{gameType ? gameType : info.gameMode}</p>

                                    <div className="flex mt-2">
                                        <div className="h-5 border-border border-[1px] overflow-hidden">
                                            <Image
                                                src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/spell/${
                                                    summonerSpells[playerStats.summoner1Id]
                                                }.png`}
                                                alt="Summoner spell"
                                                height={20}
                                                width={20}
                                            />
                                        </div>
                                        <div className="h-5 border-border border-[1px] overflow-hidden">
                                            <Image
                                                src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/spell/${
                                                    summonerSpells[playerStats.summoner2Id]
                                                }.png`}
                                                alt="Summoner spell"
                                                height={20}
                                                width={20}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col-reverse items-center mr-0 lg:mr-24 sm:flex-row">
                                <div className="sm:mr-8 ">
                                    <div className="flex ">
                                        {[...Array(7)]
                                            .map((_el, i) => playerStats[`item${i}`])
                                            .map(item => {
                                                if (!item)
                                                    return (
                                                        <div
                                                            key={Math.random()}
                                                            className="h-8 w-8 bg-background-darkest border-border border-[1px]"
                                                        ></div>
                                                    )
                                                return (
                                                    <div
                                                        key={item * Math.random()}
                                                        className="h-8 w-8 border-border border-[1px] overflow-hidden"
                                                    >
                                                        <Image
                                                            height={32}
                                                            width={32}
                                                            src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${item}.png`}
                                                            alt="Item splash art"
                                                        />
                                                    </div>
                                                )
                                            })}
                                    </div>
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
                                            <p>{playerStats.goldEarned.toString().replace(/.(?=(..)*...$)/g, '$&,')}</p>
                                            <div></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="self-start mb-3 sm:mb-0">
                                    <p className="text-xs">{info.mapId === 11 ? "Summoner's Rift" : 'Howling Abyss'}</p>

                                    <div className="flex mt-1 space-x-3 text-xs sm:mt-2 ">
                                        <p>{(info.gameDuration / 60).toFixed(2).toString().replace('.', ':')}</p>
                                        <p>{new Date(info.gameEndTimestamp).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
        </section>
    )
}
