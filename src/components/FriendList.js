import Link from 'next/link'

export default function FriendList({ data }) {
    return (
        <section className="flex flex-col flex-grow p-8 pt-4   max-w-[16rem] mx-auto">
            {data.map(el => (
                <Link href={`/grabb/${el.name}`} key={el.puuid}>
                    <div className="flex items-center cursor-pointer">
                        <img
                            src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/${el.profileIconId}.png`}
                            alt="Summoner Icon"
                            className="mr-2 border-2 rounded-full w-8 h-8  border-gold p-[2px]"
                        />
                        <a className="flex-grow py-3 text-text-light font-BeaufortBold">{el.name}</a>
                    </div>
                </Link>
            ))}
        </section>
    )
}
