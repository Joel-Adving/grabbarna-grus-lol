import { doc, setDoc, where } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '@/lib/firebase/config'
import { getCollection } from '@/lib/firebase/getCollection'
import { summoner } from '@/utils/riotFetch'

export const useAddGrabb = () => {
  const [summonerName, setSummonerName] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setMessage(null)
    setLoading(true)

    const res = await getCollection('summoners', [where('name', '==', summonerName)])

    if (res?.length) {
      setMessage('Summoner already exists in database')
      setLoading(false)
      setSummonerName('')
    } else {
      const resSummoner = await summoner(summonerName)
      await setDoc(doc(db, 'summoners', resSummoner.id), resSummoner)
      setMessage(`Added ${summonerName} to database`)
      setSummonerName('')
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => setSummonerName(e.currentTarget.value)

  return { message, loading, summonerName, handleSubmit, handleInputChange }
}
