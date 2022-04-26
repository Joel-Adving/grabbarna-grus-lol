import Card from '../components/Card'
import { summoner, matchHistory, summoners, activeMatch, activeMatches } from '../util/riotFetch'
import { grusGrabb } from '../util/constants'
import { useEffect } from 'react'
import Link from 'next/link'
import GrusGrabbList from '../components/GrusGrabbList'

export default function Home() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-background-darkest via-background-light to-background-dark">
                <div className="my-20 text-5xl text-center font-frizQuad text-gold ">
                    <h1 className="">League of Grabbarna</h1>
                    <h1 className="">Grus of Legends</h1>
                </div>
                <main className="max-w-md pb-20 mx-auto">
                    <GrusGrabbList />
                </main>
            </div>
        </>
    )
}

// export async function getStaticProps(context) {
//     const resSummoners = await summoners(grusGrabb)

//     // Implement later when revieving higher rate limit from riot production api key

//     // const resMatches = await matchHistory(resSummoners.map(smnr => smnr.puuid))
//     // const resActiveMatches = await activeMatches(resSummoners.map(smnr => smnr.id))
//     // const resActiveMatch = await activeMatch(resSummoner.id)
//     // const combined = resSummoners.map(smnr => {
//     //     const found = resMatches.find(matchSmnr => matchSmnr.puuid === smnr.puuid)
//     //     return { matches: found.matches, ...smnr }
//     // })

//     return {
//         props: {
//             data: resSummoners,
//         },
//     }
// }
