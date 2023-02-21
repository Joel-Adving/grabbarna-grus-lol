import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import { UserContext } from '../utils/types'

export const useAuth = () => useContext<UserContext | {}>(AuthContext)
