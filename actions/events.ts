'use server'

import { db } from '@/db/db'
import { events } from '@/db/schema'
import { delay } from '@/utils/delay'
import { getCurrentUser } from '@/utils/users'
import { revalidateTag } from 'next/cache'

export type EventCreateData = {
  name: string
  startOn: string
  isPrivate: boolean
}

export async function createNewEvent(
  eventData: EventCreateData
): Promise<void> {
  await delay(2000)
  const user = await getCurrentUser()

  const { startOn, name, isPrivate } = eventData

  await db.insert(events).values({
    startOn,
    name,
    isPrivate,
    createdById: user.id,
  })

  revalidateTag('dashboard:events')
  revalidateTag('events')
}
