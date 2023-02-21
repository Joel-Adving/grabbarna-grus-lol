'use client'

import RankList from '@/components/RankList'
import { useGetSummoners } from '@/hooks/useGetSummoners'

export default function Home() {
  const { summoners } = useGetSummoners()

  return (
    <>
      <div className="min-h-screen bg-background-darkest">
        <div className="flex flex-col items-center justify-center pt-6 my-10 text-3xl sm:text-4xl md:text-5xl bg-background-darkest font-frizQuad text-gold-light">
          <h1>GRABBARNA</h1>
          <div className="flex">
            <h1>GRUS</h1>
            <h3 className="self-end mx-2 mb-2 text-xs sm:mb-1 sm:text-xl text-gold-light">of</h3>
            <h1>LEGENDS</h1>
          </div>
        </div>

        {summoners && <RankList summoners={summoners} />}
      </div>
    </>
  )
}
