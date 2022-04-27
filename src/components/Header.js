import Link from 'next/link'

export default function Header() {
    return (
        <header className="w-full p-5 bg-background-darkest border-b-[1px] border-neutral-500">
            <nav className="container flex items-center justify-between mx-auto text-text font-BeaufortBold">
                <Link href={`/`}>
                    <h2 className="text-4xl cursor-pointer font-frizQuad">GoG</h2>
                </Link>
                <div className="flex space-x-3 text-lg">
                    <a href="#"></a>
                    <a href="#"></a>
                    <a href="#"></a>
                </div>
            </nav>
        </header>
    )
}
