import { signOut } from '@/contexts/AuthContext'
import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError'

interface AxiosErrorResponse {
  code?: string
}

let isRefreshing = false
let failedRequestQueue = []

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,

    /* headers: {
      Authorization: `Bearer ${cookies['gesb.token']}`,
    }, */
  })
  api.defaults.headers.Authorization = `Bearer ${cookies['gesb.token']}`

  api.interceptors.request.use(async (config) => {
    if (typeof window === 'undefined') {
      const { cookies } = await import('next/headers')
      const token = cookies().get('gesb.token')?.value

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } else {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)gesb.token\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      )

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  })

  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error: AxiosError<AxiosErrorResponse>) => {
      // console.log(error.response)

      if (error.response?.status === 401) {
        if (error.response.data?.code === 'token.expired') {
          cookies = parseCookies(ctx)

          const { 'gesb.refreshToken': refreshToken } = cookies
          const originalConfig = error.config

          if (!isRefreshing) {
            isRefreshing = true

            api
              .patch('/token/refresh', {
                refreshToken,
              })
              .then((response) => {
                const { token } = response.data

                setCookie(ctx, 'gesb.token', token, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: '/',
                })
                setCookie(
                  ctx,
                  'gesb.refreshToken',
                  response.data.refreshToken,
                  {
                    maxAge: 60 * 60 * 24 * 30, // 30 days
                    path: '/',
                  },
                )

                api.defaults.headers.Authorization = `Bearer ${token}`

                failedRequestQueue.forEach((request) =>
                  request.onSuccess(token),
                )
                failedRequestQueue = []
              })
              .catch((err) => {
                failedRequestQueue.forEach((request) => request.onFailure(err))
                failedRequestQueue = []

                if (typeof window === 'undefined') {
                  signOut()
                }
              })

              .finally(() => {
                isRefreshing = false
              })
          }

          return new Promise((resolve, reject) => {
            failedRequestQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers.Authorization = `Bearer ${token}`

                resolve(api(originalConfig))
              },
              onFailure: (err: AxiosError) => {
                reject(err)
              },
            })
          })
        } else {
          if (typeof window !== 'undefined') {
            signOut()
          } else {
            return Promise.reject(new AuthTokenError())
          }
        }
      }

      return Promise.reject(error)
    },
  )
  return api
}
