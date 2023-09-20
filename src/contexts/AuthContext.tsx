'use client'

import { ReactNode, createContext, useEffect, useState } from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { api } from '@/services/apiClient'
import { useRouter } from 'next/navigation'

type User = {
  id: string
  name: string
  email: string
  sector: string
  role: string
  avatar: string
  created_at: string
}

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
  user: User
  isAuthenticate: boolean
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)
let authChannel: BroadcastChannel

export function signOut(byBroadcastChannel = false) {
  destroyCookie(undefined, 'gesb.token')
  destroyCookie(undefined, 'gesb.refreshToken')

  if (!byBroadcastChannel) {
    authChannel.postMessage('signOut')
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(null)

  const router = useRouter()
  const isAuthenticate = false
  const { 'gesb.token': token } = parseCookies()

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut(true)
          break

        default:
          break
      }
    }
  }, [])

  useEffect(() => {
    if (token) {
      api
        .get('/me')
        .then((response) => {
          setUser(response.data.user)
        })
        .catch(() => {
          signOut()
          router.push('/')
        })
    }
  }, [router, token])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('sessions', {
        email,
        password,
      })

      const {
        token,
        refreshToken,
        id,
        name,
        sector,
        role,
        avatar,
        created_at,
      } = response.data

      setCookie(undefined, 'gesb.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })
      setCookie(undefined, 'gesb.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })

      setUser({
        id,
        name,
        email,
        sector,
        role,
        avatar,
        created_at,
      })

      api.defaults.headers.Authorization = `Bearer ${token}`

      authChannel.postMessage('signIn')

      router.push('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticate, user }}>
      {children}
    </AuthContext.Provider>
  )
}
