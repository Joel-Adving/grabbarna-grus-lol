export default function YoutubeEmbed({ id }) {
    return (
        <div className="iframe-wrapper">
            <iframe
                src={`https://www.youtube.com/embed/${id}`}
                title="Embedded youtube"
                gesture="media"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
        </div>
    )
}
