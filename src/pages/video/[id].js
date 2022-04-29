import YoutubeEmbed from '../../components/YoutubeEmbed'
import { useRouter } from 'next/router'

export default function Video() {
    const router = useRouter()

    return (
        <section className="container py-10">
            <YoutubeEmbed id={router.query.id} />
        </section>
    )
}
