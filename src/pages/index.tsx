import { GetStaticProps, NextPage } from 'next'
import { getCollection } from '../firebase/getCollection'
import RankList from '../components/RankList'

const Home: NextPage<{ data: any }> = ({ data }) => {
    const { summoners } = data

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-background-darkest via-background-darkest to-background-lightest">
                <div className="flex flex-col items-center justify-center py-6 text-2xl sm:pb-10 sm:text-4xl md:text-5xl bg-background-darkest font-frizQuad text-gold-light">
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
                <RankList data={summoners} />
            </div>
        </>
    )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
    const resSummoners = await getCollection('summoners')
    return {
        props: {
            data: {
                summoners: resSummoners,
            },
        },
        revalidate: 3,
    }
}
