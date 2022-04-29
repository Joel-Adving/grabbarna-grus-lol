import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useState } from 'react'

export function useRealTimeCollection(col) {
    const [data, setData] = useState(null)

    const colRef = collection(db, col)
    const unsubscribe = onSnapshot(colRef, querySnapshot => {
        const docs = []
        querySnapshot.forEach(doc => {
            docs.push(doc.data())
        })
        setData(docs)
        return () => unsubscribe()
    })

    return { data }
}
