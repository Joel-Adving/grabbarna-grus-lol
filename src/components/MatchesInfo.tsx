export default function MatchesInfo({ matchHistory, winRate, wins }: { matchHistory: any; winRate: number; wins: any[] }) {
  return (
    <>
      <p className="text-text-highlight">{matchHistory.length}</p>
      <h2 className="text-text-highlight">GAMES</h2>
      <p>/</p>
      <p className="text-sm">WINRATE</p>
      <p className={`${winRate >= 50 ? 'text-victory' : 'text-defeat'}`}>{winRate}%</p>
      <p>/</p>
      <div className="flex">
        <h3 className="text-victory ">{wins.length}</h3>
        <span className="mx-1">/</span>
        <h3 className=" text-defeat">{matchHistory.length - wins.length}</h3>
      </div>
    </>
  )
}
