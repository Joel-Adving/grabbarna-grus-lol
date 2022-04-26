import React from 'react'

export default function Card({ data }) {
    return <div className="py-4 border-b-[1px]  border-neutral-500 text-text-light font-sans text-sm">{data.puuid}</div>
}
