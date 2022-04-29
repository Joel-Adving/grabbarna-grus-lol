import { collection, getDocs } from 'firebase/firestore'
import { db } from './config'

export async function getCollection(col) {
    const colRef = collection(db, col)
    const querySnapshot = await getDocs(colRef)
    const data = []
    querySnapshot.forEach(doc => {
        data.push(doc.data())
    })
    return data
}
