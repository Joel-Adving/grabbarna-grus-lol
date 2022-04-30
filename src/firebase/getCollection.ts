import { collection, getDocs } from 'firebase/firestore'
import { Summoner } from '../util/types'
import { db } from './config'

export async function getCollection(col: string) {
    const colRef = collection(db, col)
    const querySnapshot = await getDocs(colRef)
    const data: Array<any> = []
    querySnapshot.forEach((doc: any) => {
        data.push(doc.data())
    })
    return data
}
