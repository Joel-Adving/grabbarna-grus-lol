import React from 'react'

export default function MatchHistoryList({ matchHistory }) {
    return (
        <>
            {matchHistory
                .filter(match => match.info)
                .map(match => (
                    <div
                        className="py-4 border-b-[1px] border-neutral-500 text-text-light font-BeaufortBold"
                        key={match?.metadata?.matchId}
                    >
                        <h2>{match?.info?.gameMode}</h2>
                    </div>
                ))}
        </>
    )
}
