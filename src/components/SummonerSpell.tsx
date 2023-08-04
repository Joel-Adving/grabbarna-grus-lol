import { LEAGUE_CDN, summonerSpells } from '@/constants'
import Image from 'next/image'

type Props = {
  summonerSpellId: keyof typeof summonerSpells
  size?: number
}

export default function SummonerSpell({ summonerSpellId, size = 20 }: Props) {
  console.log(summonerSpellId)
  return (
    <div className={`h-[${size}px] border-border border-[1px] overflow-hidden`}>
      <Image
        src={`${LEAGUE_CDN}/img/spell/${summonerSpells[summonerSpellId]}.png`}
        alt="Summoner spell"
        height={size}
        width={size}
        quality={10}
      />
    </div>
  )
}
