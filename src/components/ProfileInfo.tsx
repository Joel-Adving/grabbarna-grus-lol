import { Summoner } from '@/types'
import Image from 'next/image'

export default function ProfileInfo({ summoner }: { summoner: Summoner }) {
  return (
    <div className="flex items-center justify-center flex-grow py-3 mx-auto my-4 border-b-2 sm:mx-0 w-fit border-border bg-slate-4000 sm:justify-start">
      <div className="w-14 h-14 mr-3 border-[3px] rounded-full border-gold p-[2px] overflow-hidden">
        <Image
          src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/${summoner?.profileIconId}.png`}
          width={56}
          height={56}
          className="rounded-full"
          alt="Summoners profile icon"
        />
      </div>
      <h1 className="text-4xl font-frizQuad text-gold-light">{summoner?.name}</h1>
      <p className="mt-2 ml-3 text-2xl text-text-highlight font-BeaufortBold">{summoner?.summonerLevel}</p>
    </div>
  )
}
