import Image from 'next/image'
import Link from 'next/link'
import { PlaylistItem } from '../../types'

export const revalidate = 3600 // 1 hour

const URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLvy2rk4fbO5XK1axk5qbhFTXPf5EmiDp2&maxResults=50&key=${process.env.NEXT_PUBLIC_API_KEY}`

type VideoNumber = {
  id: string
  videoNumber: number
}

export default async function PlaylistPage() {
  const res = await fetch(URL, { next: { revalidate: 120 } }).then((res) => res.json())
  const data = { ...res, items: res?.items?.filter((item: any) => item?.snippet?.title !== 'Deleted video') }

  const videoNumbers: VideoNumber[] = data?.items?.map((item: PlaylistItem, i: number) => ({
    id: item.etag,
    videoNumber: i + 1
  }))

  return (
    <div className="bg-background-darkest ">
      <section className="container flex flex-col pb-12 mt-8">
        {data?.items
          ?.slice()
          ?.reverse()
          ?.map((item: any, i: number) => (
            <Link
              passHref
              href={`video/${item.snippet.resourceId.videoId}`}
              key={item.id}
              className="flex items-center pr-12 cursor-pointer sm:pr-1 hover:bg-background hover:text-text-highlight"
            >
              <p className="mx-4 ">{videoNumbers?.find((video) => video?.id === item?.etag)?.videoNumber}</p>
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
            </Link>
          ))}
      </section>
    </div>
  )
}
