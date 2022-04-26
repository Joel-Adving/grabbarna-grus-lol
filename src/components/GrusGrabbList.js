import React from 'react'
import { grusGrabb } from '../util/constants'
import Link from 'next/link'

export default function GrusGrabbList() {
    return (
        <section className="flex flex-col flex-grow p-8 pt-4 bg-opacity-40 bg-background-darkest border-[1px] border-border max-w-xs mx-auto">
            {grusGrabb.map(el => (
                <Link href={`/grabb/${el}`} key={el}>
                    <a className="py-4 border-b-[1px] border-neutral-500 text-text-light font-BeaufortBold">{el}</a>
                </Link>
            ))}
        </section>
    )
}
