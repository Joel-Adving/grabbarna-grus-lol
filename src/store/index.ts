import { SortBy } from '@/hooks/useFilterAndSortMatches'
import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'

// const uppercaseAtom = atom((get) => get(textAtom).toUpperCase())

const matchHistory = atom([])

export function useMatchHistory() {
  return useAtom(matchHistory)
}

const isLoadingMatchHistory = atom(false)

export function useIsLoadingMatchHistory() {
  return useAtom(isLoadingMatchHistory)
}

const sortBy = atom<SortBy>('date')

export function useSortBy() {
  return useAtom(sortBy)
}

const fetchAll = atom(false)

export function useFetchAll() {
  return useAtom(fetchAll)
}
