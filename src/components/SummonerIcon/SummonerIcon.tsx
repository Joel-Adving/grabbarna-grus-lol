import { LEAGUE_CDN } from '@/constants'
import { Summoner } from '@prisma/client'
import Image from 'next/image'
import cn from 'classnames'
import styles from './styles.module.css'

const sizes = {
  small: 24,
  medium: 32,
  large: 56
}

type Props = {
  summoner: Summoner
  size: 'small' | 'medium' | 'large'
}

export default function SummonerIcon({ summoner, size = 'small' }: Props) {
  return (
    <div className={cn(styles[size], `rounded-full border-gold overflow-hidden`)}>
      <Image
        src={`${LEAGUE_CDN}/img/profileicon/${summoner?.profileIconId}.png`}
        width={sizes[size]}
        height={sizes[size]}
        className="rounded-full"
        alt="Summoners profile icon"
        priority
        quality={70}
      />
    </div>
  )
}
