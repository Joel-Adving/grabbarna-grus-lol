import React from 'react'

import Image from 'next/image'
import { Playlist, PlaylistItem } from '../../util/types'

interface VideoNumber {
  id: string
  videoNumber: number
}

interface Props {
  data: Playlist
  videoNumbers: Array<VideoNumber>
}

const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLvy2rk4fbO5XK1axk5qbhFTXPf5EmiDp2&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`

export default async function PlaylistPage() {
  const res = await fetch(url, { next: { revalidate: 120 } }).then((res) => res.json())
  const data = { ...res, items: res.items.filter((item: any) => item.snippet.title !== 'Deleted video') }

  const videoNumbers: Array<VideoNumber> = data?.items.map((item: PlaylistItem, i: number) => ({
    id: item.etag,
    videoNumber: i + 1
  }))

  //   const [search, setSearch] = useState('')
  //   const [filtered, setFiltered] = useState<Array<PlaylistItem>>([])

  //   useEffect(() => {
  //     if (!search) return setFiltered(data.items)
  //     setFiltered(data.items.filter((item) => item.snippet.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())))
  //   }, [search, data.items])

  return (
    <div className="bg-background-darkest ">
      <section className="container flex flex-col pb-12 bg-black">
        {/* <input
          placeholder="Search"
          className="flex-grow max-w-xl my-6 rounded placeholder:text-text-diffuse text-text-light bg-background-darkest border-[1px] border-neutral-700 p-2 mx-12"
          type="text"
          //   value={search}
          //   onChange={(e) => setSearch(e.target.value)}
        /> */}
        {data?.items
          ?.slice()
          ?.reverse()
          ?.map((item: any, i: number) => (
            <a
              // href={`https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}&list=PLvy2rk4fbO5XK1axk5qbhFTXPf5EmiDp2`}
              href={`/video/${item.snippet.resourceId.videoId}`}
              key={item.id}
              className="flex items-center pr-12 cursor-pointer sm:pr-1 hover:bg-background hover:text-text-highlight"
            >
              <p className="mx-4 ">
                {
                  // @ts-ignore
                  videoNumbers.find((video) => video.id === item.etag).videoNumber
                }
              </p>
              <div className="flex border-b-[1px] border-neutral-700 flex-grow">
                <div className="flex items-center">
                  <div className="">
                    {item?.snippet?.thumbnails?.default?.url && (
                      <Image src={item.snippet.thumbnails.default.url} width={120} height={90} alt="Thumbnail" />
                    )}
                  </div>
                  <h2 className="ml-3 ">{item.snippet.title}</h2>
                </div>
              </div>
            </a>
          ))}
      </section>
    </div>
  )
}
