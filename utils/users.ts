import 'server-only'
import { COOKIE_NAME } from './constants'
import { getUserFromToken } from './authTools'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { users } from '@/db/schema'
import { InferSelectModel } from 'drizzle-orm'
import { cache } from 'react'

type User = InferSelectModel<typeof users>

async function getUser(): Promise<User> {
  const token = cookies().get(COOKIE_NAME)
  if (!token) redirect('/signin')

  const user = getUserFromToken(token)
  if (!user) redirect('/signin')

  return user as Promise<User>
}

export const getCurrentUser = cache(getUser)
