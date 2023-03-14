import { LEAGUE_CDN } from '@/constants'
import { Participant } from '@/types'
import Image from 'next/image'
import Items from '../../Items'
import SummonerSpell from '../../SummonerSpell'
import styles from './styles.module.css'

export default function Team({ team }: { team: Participant[] }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {team.map((player, i: number) => (
        <div key={i} className={`${styles.rootGrid}`}>
          <div className="flex items-center gap-2">
            <div>
              <SummonerSpell size={14} summonerSpellId={player.summoner1Id} />
              <SummonerSpell size={14} summonerSpellId={player.summoner2Id} />
            </div>
            <p className="font-BeaufortBold text-text-highlight">{player.champLevel}</p>
            <div className="w-10 h-10 border-border rounded-full border-[2.5px] overflow-hidden">
              <Image
                src={`${LEAGUE_CDN}/img/champion/${player.championName}.png`}
                alt="Champion splash art"
                height={40}
                width={40}
                className="rounded-full"
                quality={60}
                priority
              />
            </div>
            <p>{player.summonerName}</p>
          </div>

          <div className={`${styles.childGrid} text-text-highlight font-BeaufortBold`}>
            <Items size={32} playerStats={player} />

            <div className="grid place-content-center">
              <p className="flex gap-1.5">
                <span>{player.kills}</span>
                <span>/</span>
                <span>{player.deaths}</span>
                <span>/</span>
                <span>{player.assists}</span>
              </p>
            </div>

            <p className="grid place-content-center">{player.totalMinionsKilled}</p>
            <p className="grid place-content-center">{player.goldEarned.toString().replace(/.(?=(..)*...$)/g, '$&,')}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
