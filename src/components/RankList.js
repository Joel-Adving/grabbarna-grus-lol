import { leagueRanks } from '../util/constants'

export default function RankList({ data }) {
    const players = data.map(player => ({
        ...player,
        joelsRanks: player.ranks.length
            ? player.ranks.find(el => el.queueType === 'RANKED_FLEX_SR')
            : { queueType: 'RANKED_FLEX_SR', tier: 'UNRANKED' },
    }))

    const sortedPlayers = players
        .slice()
        .sort((a, b) => leagueRanks[a.joelsRanks.tier] - leagueRanks[b.joelsRanks.tier])

    return (
        <section className="border-t-[1px] border-zinc-600 max-w-2xl pb-20 mx-auto font-BeaufortBold text-text-light pt-3">
            <div className="flex justify-between pb-2 text-sm text-text-highlight border-b-[1px] border-zinc-600 px-3">
                <div className="flex ">
                    <p className="w-3 mr-3 sm:mr-20">#</p>
                    <p>GRUSGRABBAR</p>
                </div>
                <div className="flex">
                    <p className="mr-3 sm:mr-16">LEAGUE</p>
                    <p className="ml-1.5 mr-1.5">W/L</p>
                </div>
            </div>
            {sortedPlayers.map((player, i) => {
                return (
                    <a
                        href={'/grabb/' + player.name}
                        key={player.id}
                        className="flex justify-between py-1.5 text-sm hover:bg-background-lightest px-3 hover:text-text-highlight"
                    >
                        <div className="flex">
                            <p className="w-3 mr-3 sm:mr-20">{i + 1}</p>
                            <p>{player.name}</p>
                        </div>

                        <div className="flex">
                            <p className="">
                                {player.joelsRanks.tier} {player.joelsRanks.rank}
                            </p>
                            <p className="w-5 ml-3 mr-5 sm:ml-14 ">
                                {player.joelsRanks.wins}
                                {player.joelsRanks.rank ? '/' : ''}
                                {player.joelsRanks.losses}
                            </p>
                        </div>
                    </a>
                )
            })}
        </section>
    )
}
