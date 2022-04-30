import { GetStaticProps, NextPage } from 'next'
import RankList from '../components/RankList'
import { getCollection } from '../firebase/getCollection'
import { ranks } from '../util/riotFetch'
import { Summoner, SummonerAndRank, summonerRankInfo, SummonersInfo } from '../util/types'

const Home: NextPage<{ data: SummonersInfo }> = ({ data }) => {
    const { summoners, ranks: resRanks } = data

    const ranksArr = summoners.map((summoner: Summoner) => ({
        ...summoner,
        ranks: resRanks.flat().filter((rank: summonerRankInfo) => rank.summonerId === summoner.id),
    }))

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-background-darkest via-background-darkest to-background-lightest">
                <div className="flex flex-col items-center justify-center py-6 pb-10 text-2xl sm:text-4xl md:text-5xl bg-background-darkest font-frizQuad text-gold-light">
                    {/* <div className="flex">
                        <h1>LEAGUE</h1>
                        <h3 className="self-end mb-2 ml-1 text-xs sm:text-xl text-gold-light">of</h3>
                    </div> */}
                    <h1>GRABBARNA</h1>
                    <div className="flex">
                        <h1>GRUS</h1>
                        <h3 className="self-end mx-2 mb-1 text-xs sm:text-xl text-gold-light">of</h3>
                        <h1>LEGENDS</h1>
                    </div>
                </div>
                <RankList data={ranksArr} />
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const resSummoners = await getCollection('summoners')
    const resRanks = await ranks(resSummoners.map(summoner => summoner.id))

    return {
        props: {
            data: { summoners: resSummoners, ranks: resRanks },
        },
        revalidate: 3,
    }
}

export default Home
