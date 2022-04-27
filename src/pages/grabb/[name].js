import { grusGrabb } from '../../util/constants'
import { summoner, summoners, matchHistory, activeMatch, matches } from '../../util/riotFetch'
import MatchHistoryList from '../../components/MatchHistoryList'
import FriendList from '../../components/FriendList'
import { percentages } from '../../util/helpers'
import Link from 'next/link'

export default function GrusGrabb({ data }) {
    const playerStats = data.matchHistory
        .filter(match => match.info)
        .map(match => match.info.participants.find(player => player.summonerId === data.summoner.id))

    const wins = playerStats.filter(el => el.win)
    const champions = playerStats.map(player => player.championName)

    const recentChamps = Object.assign(
        ...Object.entries(percentages(champions))
            .sort(({ 1: a }, { 1: b }) => b - a)
            .slice(0, 3)
            .map(([k, v]) => ({ [k]: v }))
    )

    return (
        <div className="min-h-screen pt-5 from-background-darkest">
            <div className="container pb-5">
                <Link href={'/'}>
                    <a className="pl-4 text-lg sm:pl-0 font-BeaufortBold text-text">HOME</a>
                </Link>
            </div>
            <div className="container flex flex-col border-t-2 border-border">
                <div className="flex flex-col md:flex-row">
                    <div className="flex flex-col justify-between">
                        <div className="flex items-center ">
                            <div className="flex items-center justify-center flex-grow max-w-2xl py-3 border-b-2 border-border bg-slate-4000 sm:justify-start">
                                <img
                                    src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/${data.summoner.profileIconId}.png`}
                                    alt="Summoner Icon"
                                    className="w-14 h-14 mr-3 border-[3px] rounded-full border-gold p-[2px]"
                                />
                                <h1 className="text-4xl font-frizQuad text-gold-light ">{data.summoner.name}</h1>
                            </div>
                        </div>
                        <div className="hidden font-BeaufortBold md:flex">
                            <h2 className=" text-text-highlight">RECENT GAMES (LAST 20 PLAYED)</h2>
                            <div className="flex ml-3">
                                <h3 className="text-victory ">{wins.length}</h3>
                                <span className="mx-1">/</span>
                                <h3 className=" text-defeat">{20 - wins.length}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center mt-5 md:ml-[15vw] text-sm md:pb-6 md:pt-2">
                        <h3 className="mb-2 font-BeaufortBold text-text-highlight">RECENTLY PLAYED CHAMPIONS</h3>
                        <div className="flex gap-4 ">
                            {Object.entries(recentChamps).map(([key, value]) => (
                                <div key={Math.random()}>
                                    <img
                                        className="w-16 h-16 border-[1px] border-gray-600"
                                        src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/${key}.png`}
                                    />
                                    <p className="mt-3 text-center font-BeaufortBold text-gold-light">{value}%</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center mt-6 mb-3 font-BeaufortBold md:hidden">
                        <h2 className=" text-text-highlight">RECENT GAMES (LAST 20 PLAYED)</h2>
                        <div className="flex ml-3">
                            <h3 className="text-victory ">{wins.length}</h3>
                            <span className="mx-1">/</span>
                            <h3 className=" text-defeat">{20 - wins.length}</h3>
                        </div>
                    </div>
                </div>
                <div className="flex ">
                    <MatchHistoryList matchHistory={data.matchHistory} summoner={data.summoner} />
                    <div className="hidden md:block">
                        <FriendList data={data.summoners} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    const paths = grusGrabb.map(summoner => ({ params: { name: summoner } }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps(context) {
    const { name } = context.params
    const resSummoner = await summoner(name)
    const resMatchHistory = await matchHistory(resSummoner.puuid)
    const resMatches = await matches(resMatchHistory)
    const resActiveMatch = await activeMatch(resSummoner.id)
    const resSummoners = await summoners(grusGrabb)

    return {
        props: {
            data: {
                summoner: resSummoner,
                matchHistory: resMatches,
                activeMatch: resActiveMatch,
                summoners: resSummoners,
            },
        },
    }
}
