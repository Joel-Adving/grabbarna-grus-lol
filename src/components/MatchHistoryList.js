import React from 'react'

export default function MatchHistoryList({ matchHistory }) {
    return (
        <>
            {matchHistory
                .filter(match => match.info)
                .map(match => (
                    <div key={match?.metadata?.matchId}>{match?.info?.gameMode}</div>
                ))}
        </>
    )
}
