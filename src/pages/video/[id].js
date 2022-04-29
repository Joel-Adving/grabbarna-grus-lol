import YoutubeEmbed from '../../components/YoutubeEmbed'
import { useRouter } from 'next/router'

export default function Video() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-neutral-900">
            <div className="bg-black">
                <section className="container pt-10 ">
                    <YoutubeEmbed id={router.query.id} />
                </section>
            </div>
        </div>
    )
}
