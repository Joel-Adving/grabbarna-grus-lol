import React from 'react'

export const YoutubeEmbed: React.FC<{ id: string }> = ({ id }) => {
    return (
        <div className="iframe-wrapper">
            <iframe
                src={`https://www.youtube.com/embed/${id}`}
                title="Embedded youtube"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
        </div>
    )
}

export default YoutubeEmbed
