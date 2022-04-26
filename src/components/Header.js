import Link from 'next/link'
import React from 'react'

export default function Header() {
    return (
        <header className="w-screen p-5 bg-background-darkest border-b-[1px] border-neutral-500">
            <nav className="container flex items-center justify-between mx-auto text-text font-BeaufortBold">
                <Link href={`/`}>
                    <h2 className="text-4xl cursor-pointer font-frizQuad">Grus</h2>
                </Link>
                <div className="flex space-x-3 text-lg">
                    <a href="#">HOME</a>
                    <a href="#">ABOUT</a>
                    <a href="#">CONTACT</a>
                </div>
            </nav>
        </header>
    )
}
