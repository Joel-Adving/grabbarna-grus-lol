import GrusGrabbList from '../components/GrusGrabbList'
import { grusGrabb } from '../util/constants'
import { summoners } from '../util/riotFetch'

export default function Home({ data }) {
    console.log(data)
    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-background-darkest via-background-light to-background-dark">
                <div className="my-20 text-5xl text-center font-frizQuad text-gold-light ">
                    <h1 className="">League of Grabbarna</h1>
                    <h1 className="">Grus of Legends</h1>
                </div>
                <main className="max-w-md pb-20 mx-auto">
                    <GrusGrabbList data={data} />
                </main>
            </div>
        </>
    )
}

export async function getStaticProps(context) {
    const resSummoners = await summoners(grusGrabb)

    return {
        props: {
            data: resSummoners,
        },
    }
}
