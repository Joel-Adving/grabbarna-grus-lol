'use client'

import YoutubeEmbed from '../../../components/YoutubeEmbed'
import { useRouter } from 'next/navigation'

export default function Video({ params }: any) {
  return (
    <div className="min-h-screen bg-neutral-900">
      <div className="bg-black">
        <section className="container pt-10 ">
          <YoutubeEmbed id={params.id?.toString() ?? ''} />
        </section>
      </div>
    </div>
  )
}
