'use client'

import { collection, getDocs, query } from 'firebase/firestore'
import { db } from './config'

export async function getSubCollection(parentCol: string, docId: any, subCol: string, queryArr: Array<any> = []) {
  try {
    const subColRef = collection(db, parentCol, docId, subCol)
    const data: Array<any> = []

    if (queryArr.length) {
      const q = query(subColRef, ...queryArr)
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        data.push(doc.data())
      })
    } else {
      const querySnapshot = await getDocs(subColRef)
      querySnapshot.forEach((doc: any) => {
        data.push(doc.data())
      })
    }

    return data
  } catch (e) {}
}
