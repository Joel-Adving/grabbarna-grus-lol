import RankList from '../components/RankList'
import { grusGrabbar } from '../util/constants'
import { sleep } from '../util/helpers'
import { ranks, summoners } from '../util/riotFetch'

export default function Home({ data }) {
    const { resSummoners, resRanks } = data
    const ranksArr = resSummoners.map(summoner => ({
        ...summoner,
        ranks: resRanks.flat().filter(el => el.summonerId === summoner.id),
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

export async function getStaticProps(context) {
    const resSummoners = await summoners(grusGrabbar)
    // sleep because of API rate limitation
    await sleep(1100)
    const resRanks = await ranks(resSummoners.map(summoner => summoner.id))

    return {
        props: {
            data: { resSummoners, resRanks },
        },
        revalidate: 3,
    }
}
