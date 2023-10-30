'use client'

import { matchHistorySelectOptions } from '@/constants'
import { SortBy } from '@/hooks/useFilterAndSortMatches'
import { useSortBy } from '@/store'
import React, { useEffect } from 'react'

export default function SortBy() {
  const [sortBy, setSortBy] = useSortBy()

  useEffect(() => {
    return () => {
      if (sortBy !== 'date') {
        setSortBy('date') // reset sortby when we unmount
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSortBy])

  return (
    <select
      onChange={(e) => setSortBy(e.target.value as SortBy)}
      value={sortBy}
      className="px-2 py-1 text-sm border rounded outline-none bg-background-darkest hover:border-text-light border-text-diffuse"
    >
      {matchHistorySelectOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
