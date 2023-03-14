import { LEAGUE_CDN } from '@/constants'
import Image from 'next/image'

type Props = {
  playerStats: any
  size?: number
}

export default function Items({ playerStats, size = 32 }: Props) {
  const items = [...Array(7)].map((_el, i) => playerStats[`item${i}`])

  return (
    <div className="grid grid-cols-7">
      {items.map((item, i) => {
        if (!item)
          return <div key={i} style={{ height: size }} className={`bg-background-darkest border-border border-[1px]`}></div>
        return (
          <Image
            style={{ height: size }}
            key={i}
            className={`border-border border-[1px] overflow-hidden`}
            height={size}
            width={size}
            src={`${LEAGUE_CDN}/img/item/${item}.png`}
            alt="Item splash art"
            quality={60}
            priority
          />
        )
      })}
    </div>
  )
}
