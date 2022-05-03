import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { getCollection } from '../firebase/getCollection'
import { summonersState } from '../recoil/summonersAtom'

export const useGetSummoners = () => {
    const [isLoading, setLoading] = useState(false)
    const [summoners, setSummoners] = useRecoilState(summonersState)

    useEffect(() => {
        if (summoners) return
        getSummoners()
    }, [])

    const getSummoners = async () => {
        setLoading(true)
        const data = await getCollection('summoners')
        setSummoners(data)
        setLoading(false)
    }
    return { isLoading, summoners }
}
