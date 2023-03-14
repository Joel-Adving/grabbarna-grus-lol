'use client'

import { useGetMatch } from '@/hooks/useGetMatch'
import type { Match } from '@/types'
import { useMemo } from 'react'
import Team from './Team'

const getTeam = (match: Match, id: number) => match.info.participants.filter((p: any) => p.teamId === id)

export default function Match({ matchId, summoner }: { matchId: string; summoner?: string }) {
  const { match } = useGetMatch(matchId)

  const team1 = useMemo(() => (match ? getTeam(match, 100) : []), [match])
  const team2 = useMemo(() => (match ? getTeam(match, 200) : []), [match])

  return (
    <div className="mt-5">
      {match && (
        <div className="flex flex-col items-center gap-6">
          <div className="w-full">
            <div className="mx-auto mb-3 text-2xl md:text-xl w-fit md:mx-0 text-text-highlight font-BeaufortBold">
              TEAM 1
            </div>
            <Team team={team1} />
          </div>

          <div className="w-full">
            <div className="mx-auto mb-3 text-2xl md:text-xl w-fit md:mx-0 text-text-highlight font-BeaufortBold">
              TEAM 2
            </div>
            <Team team={team2} />
          </div>
        </div>
      )}
    </div>
  )
}
