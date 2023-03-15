import { LEAGUE_CDN } from '@/constants'
import { Participant } from '@/types'
import Image from 'next/image'
import Items from '../../Items'
import SummonerSpell from '../../SummonerSpell'
import styles from './styles.module.css'

export default function Team({ team }: { team: Participant[] }) {
  return (
    <div className="flex flex-col items-center gap-1">
      {team.map((summoner, i: number) => (
        <div
          key={i}
          className={`flex w-full mb-10 lg:mb-0 justify-between flex-col lg:flex-row items-center gap-4 lg:gap-0`}
        >
          <div className="flex items-center gap-2.5">
            <div>
              <SummonerSpell size={14} summonerSpellId={summoner.summoner1Id} />
              <SummonerSpell size={14} summonerSpellId={summoner.summoner2Id} />
            </div>

            <p className="font-BeaufortBold text-text-highlight">{summoner.champLevel}</p>

            <div className="w-9 h-9 border-border rounded-full border-[2.5px] overflow-hidden">
              <Image
                src={`${LEAGUE_CDN}/img/champion/${summoner.championName}.png`}
                alt="Champion splash art"
                height={36}
                width={36}
                className="rounded-full"
                quality={60}
                priority
              />
            </div>
            <p className={`${summoner._highlightedSummoner && styles.highlight}`}>{summoner.summonerName}</p>
          </div>

          <div
            className={`flex items-center flex-col lg:flex-row gap-4 lg:gap-0 justify-between font-BeaufortBold max-w-md lg:max-w-[31rem] w-full ${
              summoner._highlightedSummoner ? styles.highlight : 'text-text-highlight'
            }`}
          >
            <Items size={28} playerStats={summoner} />

            <div className="flex items-center gap-6">
              <div className="lg:min-w-[7rem] flex justify-center">
                <p className="flex gap-2">
                  <span>{summoner.kills}</span>
                  <span>/</span>
                  <span>{summoner.deaths}</span>
                  <span>/</span>
                  <span>{summoner.assists}</span>
                </p>
              </div>

              <p className="lg:min-w-[2.5rem] flex justify-center">{summoner.totalMinionsKilled}</p>
              <p className="lg:min-w-[4rem] flex justify-center">
                {summoner.goldEarned.toString().replace(/.(?=(..)*...$)/g, '$&,')}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
