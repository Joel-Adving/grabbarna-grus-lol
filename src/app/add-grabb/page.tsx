'use client'

import { useUser } from '@/hooks/useUser'
import { nextApi } from '@/services/nextApi'
import { useState } from 'react'

export default function AddSummoner() {
  const [key, setKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [summonerName, setSummonerName] = useState('')
  const [data, setData] = useState<any>(null)

  const user = useUser()

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)
    setData(null)
    const res = await nextApi.addNewSummoner(summonerName, key)
    if (res.success) {
      setMessage('Summoner added successfully')
      setData(res.data)
      setSummonerName('')
    } else {
      setMessage(res.message)
    }
    setLoading(false)
  }

  if (user?.name !== 'Joel Adving') {
    return null
  }

  return (
    <section className="container flex justify-center items-center flex-col text-text font-BeaufortBold place-content-center min-h-[70dvh]">
      <h1 className="mx-auto mb-8 text-2xl">Add New Summoner</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-start w-full max-w-xs gap-3">
        <input
          className="focus:outline-none rouded mx-auto w-full text-text-highlight bg-background border-[1px] border-neutral-700 rounded-sm p-1 pl-2"
          type="password"
          value={key}
          onChange={(e) => setKey(e.currentTarget.value)}
          placeholder="Api key"
          required
        />
        <input
          className="focus:outline-none rouded mx-auto w-full text-text-highlight bg-background border-[1px] border-neutral-700 rounded-sm p-1 pl-2"
          type="text"
          value={summonerName}
          onChange={(e) => setSummonerName(e.currentTarget.value)}
          placeholder="Summoner name"
          required
        />
        <button
          disabled={loading}
          className="w-full p-1 mx-auto border rounded hover:border-text hover:text-text border-text-light text-text-highlight"
        >
          {loading ? 'LOADING' : 'submit'}
        </button>
        <div className="flex flex-col items-center w-full text-center">
          {message && <p>{message}</p>}
          {data && (
            <div>
              <p className="mb-1 text-2xl">{data.name}</p>
              <p className="break-all">{data.summonerId}</p>
            </div>
          )}
        </div>
      </form>
    </section>
  )
}
