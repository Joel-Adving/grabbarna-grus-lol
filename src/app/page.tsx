import RankList from '@/components/RankList'

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-background-darkest">
        <h1 className="flex flex-col items-center justify-center pt-6 my-10 text-3xl uppercase sm:text-4xl md:text-5xl bg-background-darkest font-frizQuad text-gold-light">
          Grabbarna
          <span className="flex">
            Grus
            <span className="self-end mx-2 mb-2 text-xs lowercase sm:mb-1 sm:text-xl text-gold-light">of</span>
            Legends
          </span>
        </h1>
        <RankList />
      </div>
    </>
  )
}
