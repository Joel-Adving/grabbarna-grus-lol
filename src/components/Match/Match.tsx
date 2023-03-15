'use client'

import { useGetMatch } from '@/hooks/useGetMatch'
import type { Match } from '@/types'
import { useMemo } from 'react'
import Team from './Team'

const getTeam = (match: Match, id: number) => match.info.participants.filter((p: any) => p.teamId === id)

export default function Match({ matchId, summoner }: { matchId: string; summoner?: string }) {
  const { match } = useGetMatch(matchId)

  const teams = useMemo(() => {
    if (!match) return []
    const teams = [getTeam(match, 100), getTeam(match, 200)]
    for (const team of teams) {
      const foundSummoner = team.find((p) => p.summonerName === summoner)
      if (!foundSummoner) continue
      foundSummoner._highlightedSummoner = true
      //@ts-ignore
      team.sort((a) => {
        if (a.summonerName === summoner) return -1
      })
    }
    //@ts-ignore
    teams.sort((a) => {
      if (a.find((p) => p.summonerName === summoner)) return -1
    })
    return teams
  }, [match, summoner])

  console.log(teams)

  return (
    <div className="flex flex-col items-center gap-6 mt-5">
      {teams?.map((team, i) => {
        const won = team.some((t) => t.win)
        return (
          <div key={i} className="w-full">
            <div className="flex items-center mx-auto mb-3 text-2xl font-BeaufortBold md:text-xl w-fit lg:mx-0">
              <p className={`${team.some((t) => t.win) ? 'text-victory' : 'text-defeat'}`}>TEAM {i + 1}</p>

              <p className={`flex gap-2 ml-4 lg:ml-[14.5rem] ${won ? 'text-victory' : 'text-defeat'}`}>
                <span>{team?.reduce((acc, item) => item?.kills + acc, 0)}</span>
                <span>/</span>
                <span>{team?.reduce((acc, item) => item?.deaths + acc, 0)}</span>
                <span>/</span>
                <span>{team?.reduce((acc, item) => item?.assists + acc, 0)}</span>
              </p>
            </div>
            <Team team={team} />
          </div>
        )
      })}
    </div>
  )
}
