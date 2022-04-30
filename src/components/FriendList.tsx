import Link from 'next/link'
import Image from 'next/image'
import { useRealTimeCollection } from '../hooks/useRealTimeCollection'
import { Summoner } from '../util/types'

export default function FriendList() {
    const { data: summoners } = useRealTimeCollection('summoners')

    return (
        <section className="flex flex-col flex-grow max-w-[16rem] mx-auto bg-background ml-3">
            {summoners &&
                summoners
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((summoner: Summoner) => (
                        <Link passHref href={`/grabb/${summoner.name}`} key={summoner.puuid}>
                            <div className="flex items-center pl-2 cursor-pointer lg:pr-14 md:pr-2 hover:bg-slate-800 hover:text-text-highlight">
                                <div className="mr-2 border-2 rounded-full w-8 h-8  border-gold p-[2px] overflow-hidden">
                                    <Image
                                        src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/${summoner.profileIconId}.png`}
                                        alt="Summoner Icon"
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                        quality={50}
                                    />
                                </div>
                                <a className="flex-grow py-3 text-text-light font-BeaufortBold">{summoner.name}</a>
                            </div>
                        </Link>
                    ))}
        </section>
    )
}
