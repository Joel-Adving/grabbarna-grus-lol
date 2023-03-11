import { Summoner } from '@prisma/client'
import SummonerIcon from './SummonerIcon/SummonerIcon'

export default function ProfileInfo({ summoner }: { summoner: Summoner }) {
  return (
    <div className="flex items-center justify-center flex-grow py-3 mx-auto my-4 border-b-2 sm:mx-0 w-fit border-border bg-slate-4000 sm:justify-start">
      <SummonerIcon summoner={summoner} size="large" />
      <h1 className="ml-3 text-4xl font-frizQuad text-gold-light">{summoner?.name}</h1>
      <p className="mt-2 ml-3 text-2xl text-text-highlight font-BeaufortBold">{summoner?.summonerLevel}</p>
    </div>
  )
}
