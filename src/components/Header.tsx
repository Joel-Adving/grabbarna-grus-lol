import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '../hooks/useAuth'

export default function Header() {
    // @ts-ignore
    const { user, signin, logout } = useAuth()

    return (
        <header className="bg-background-darkest font-BeaufortBold text-text  border-t-[2.5px] border-b-[1px] border-neutral-700 border-t-border-light">
            <nav className="container flex justify-between w-full px-3 py-4 mx-auto sm:px-0">
                <div className="flex items-center">
                    {/* <h2 className="hidden mr-3 text-xl sm:mr-12 text-text-highlight border-victory sm:block">GRUS</h2> */}
                    <div className="flex space-x-8">
                        <Link href="/">HOME</Link>
                        {user && (
                            <button>
                                <Link href="/playlist">PLAYLIST</Link>
                            </button>
                        )}
                    </div>
                </div>
                {!user && (
                    <button className="" onClick={() => signin()}>
                        SIGN IN
                    </button>
                )}
                {user && (
                    <div className="flex items-center ">
                        <button className="" onClick={() => logout()}>
                            SIGN OUT
                        </button>
                        <div className="w-12 h-12 ml-3 sm:mx-3 border-[2.5px] rounded-full border-victory">
                            <Image
                                className="rounded-full "
                                src={user.photoURL}
                                alt="User profile image"
                                height={48}
                                width={48}
                            />
                        </div>
                        <h3 className="hidden sm:block text-text-highlight">{user.name.toUpperCase()}</h3>
                    </div>
                )}
            </nav>
        </header>
    )
}
