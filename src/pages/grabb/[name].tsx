import MatchHistoryList from '../../components/MatchHistoryList'
import FriendList from '../../components/FriendList'
import { percentages } from '../../util/helpers'
import Image from 'next/image'
import { matches, matchHistory, summoner } from '../../util/riotFetch'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { LeagueMatch, PlayerStats, Summoner } from '../../util/types'
import imageLoader from '../../util/imageLoader'

export const GrusGrabb: NextPage<{ summoner: Summoner; matchHistory: Array<LeagueMatch> }> = ({
    summoner,
    matchHistory,
}) => {
    const playerStats = matchHistory
        .filter((match: LeagueMatch) => match?.info !== undefined || match?.info == null)
        .map((match: LeagueMatch) =>
            match?.info?.participants.find((player: any) => player?.summonerId === summoner.id)
        )

    const wins = playerStats.filter((player: PlayerStats) => player?.win)
    const champions = playerStats.map((player: PlayerStats) => player?.championName)
    const recentChamps = Object.assign(
        // @ts-ignore
        ...Object.entries(percentages(champions))
            .sort(({ 1: a }: any, { 1: b }: any) => b - a)
            .slice(0, 3)
            .map(([k, v]) => ({ [k]: v }))
    )

    return (
        <div className="min-h-screen bg-gradient-to-b from-background-darkest via-background-background to-background">
            <div className="container flex flex-col border-t-2 border-border">
                <div className="flex flex-col justify-between md:flex-row">
                    <div className="flex flex-col justify-between">
                        <div className="flex items-center ">
                            <div className="flex items-center justify-center flex-grow max-w-2xl py-3 border-b-2 border-border bg-slate-4000 sm:justify-start">
                                <div className="w-14 h-14 mr-3 border-[3px] rounded-full border-gold p-[2px] overflow-hidden">
                                    <Image
                                        loader={imageLoader}
                                        src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/${summoner.profileIconId}.png`}
                                        width={56}
                                        height={56}
                                        className="rounded-full"
                                        alt="Summoners profile icon"
                                    />
                                </div>
                                <h1 className="text-4xl font-frizQuad text-gold-light ">{summoner.name}</h1>
                                <p className="mt-2 ml-3 text-2xl text-text-highlight font-BeaufortBold">
                                    {summoner.summonerLevel}
                                </p>
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

                    <div className="flex flex-col items-center mt-6 mb-3 text-sm">
                        <h3 className="mb-2 font-BeaufortBold text-text-highlight">RECENTLY PLAYED CHAMPIONS</h3>
                        <div className="flex gap-4 ">
                            {Object.entries(recentChamps).map(([key, value]: any, i) => (
                                <div key={i}>
                                    <div className="w-16 h-16 border-[1px] border-gray-600 overflow-hidden">
                                        <Image
                                            loader={imageLoader}
                                            src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/${key}.png`}
                                            height={64}
                                            width={64}
                                            alt="Recently played champion"
                                        />
                                    </div>
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
                    <MatchHistoryList matchHistory={matchHistory} summoner={summoner} />
                    <div className="hidden mt-6 md:block">
                        <FriendList />
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = () => {
    // const paths = grusGrabbar.map(summoner => ({ params: { name: summoner } }))
    const paths = [{ params: { name: 'Pappenos' } }]

    return {
        paths,
        fallback: 'blocking',
        // fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async context => {
    // @ts-ignore
    const { name } = context.params
    const resSummoner: Summoner = await summoner(name)
    const resMatches = await matches(await matchHistory(resSummoner.puuid))

    return {
        props: {
            summoner: resSummoner,
            matchHistory: resMatches,
        },
        revalidate: 5,
    }
}

export default GrusGrabb
