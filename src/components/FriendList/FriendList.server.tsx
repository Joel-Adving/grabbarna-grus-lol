import React from 'react'
import { Summoner } from '@prisma/client'
import { nextApi } from '@/services/nextApi'
import FriendListItem from './FriendList.client'

export default async function FriendList() {
  const summoners = await nextApi.getSummoners()

  return (
    <section className="w-[16rem] h-[88dvh] overflow-y-auto sticky top-[5.2rem] mx-auto bg-background border-[1px] border-background-light rounded-sm p-2 ml-3">
      {summoners
        .sort((a: any, b: any) => a.name.localeCompare(b.name))
        .map((summoner: Summoner) => (
          <FriendListItem key={summoner.puuid} summoner={summoner} />
        ))}
    </section>
  )
}
