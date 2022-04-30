import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore'
import React, { useState } from 'react'
import { summoner } from '../util/riotFetch'
import { db } from '../firebase/config'

export const useAddGrabb = () => {
    const [summonerName, setSummonerName] = useState('')
    const [message, setMessage] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setMessage(null)
        setLoading(true)

        const q = query(collection(db, 'summoners'), where('name', '==', summonerName))
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
            setMessage('Summoner already exists in database')
            setLoading(false)
            setSummonerName('')
            return
        }

        const resSummoner = await summoner(summonerName)
        await setDoc(doc(db, 'summoners', resSummoner.id), resSummoner)
        setMessage(`Added ${summonerName} to database`)
        setSummonerName('')
        setLoading(false)
    }

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => setSummonerName(e.currentTarget.value)

    return { message, loading, summonerName, handleSubmit, handleInputChange }
}