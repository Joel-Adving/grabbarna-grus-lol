'use client'

import { useSummoner } from '@/hooks/useSummoner'
import ProfileInfo from './ProfileInfo'

export default function PlayerStats({ name }: { name: string }) {
  const { summoner } = useSummoner(name)
  return summoner ? <ProfileInfo summoner={summoner} /> : null
}
