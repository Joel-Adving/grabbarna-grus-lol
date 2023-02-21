'use client'

import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import { UserContext } from '../util/types'

export const useAuth = () => useContext<UserContext | {}>(AuthContext)
