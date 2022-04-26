import { useEffect } from 'react'
import { grusGrabb } from '../../util/constants'
import { summoner, summoners, matchHistory, activeMatch, matches } from '../../util/riotFetch'
import MatchHistoryList from '../../components/MatchHistoryList'
import GrusGrabbList from '../../components/GrusGrabbList'

export default function GrusGrabb({ data }) {
    useEffect(() => {
        console.log(data)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-b from-background-darkest via-background-light to-background-dark">
            <div className="container flex flex-col">
                <div className="flex items-center self-center my-14">
                    <img
                        src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/${data.summoner.profileIconId}.png`}
                        alt="Summoner Icon"
                        className="w-20 h-20 mr-6 border-2 rounded-full border-border"
                    />
                    <h1 className="text-5xl font-frizQuad text-text">{data.summoner.name}</h1>
                </div>
                <div className="flex ">
                    <section className="flex flex-col flex-grow p-8 pt-4 bg-opacity-40 bg-background-darkest border-[1px] border-border">
                        <MatchHistoryList matchHistory={data.matchHistory} />
                    </section>
                    <GrusGrabbList />
                </div>
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    // const resSummoners = await summoners(grusGrabb)
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

    return {
        props: {
            data: {
                summoner: resSummoner,
                matchHistory: resMatches,
                activeMatch: resActiveMatch,
            },
        },
    }
}
