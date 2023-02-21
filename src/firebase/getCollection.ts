'use client'

import { collection, getDocs, query } from 'firebase/firestore'
import { db } from './config'

export async function getCollection(col: string, queryArr: Array<any> = []) {
  try {
    const colRef = collection(db, col)
    const data: Array<any> = []

    if (queryArr.length) {
      const q = query(colRef, ...queryArr)
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        data.push(doc.data())
      })
    } else {
      const querySnapshot = await getDocs(colRef)
      querySnapshot.forEach((doc) => {
        data.push(doc.data())
      })
    }

    return data
  } catch (e) {}
}
