import 'server-only'
import { db } from '@/db/db'
import {
  asc,
  and,
  count,
  desc,
  ne,
  eq,
  not,
  InferSelectModel,
} from 'drizzle-orm'
import { events } from '@/db/schema'
import { delay } from './delay'
import { memoize } from 'nextjs-better-unstable-cache'

type DashboardEvent = {
  id: string
  name: string
  startOn: string
  status: string
  rsvps: any[]
}

export type Event = InferSelectModel<typeof events>

async function getEvents(userId: string): Promise<DashboardEvent[] | []> {
  await delay()

  const data = db.query.events.findMany({
    where: eq(events.createdById, userId),
    columns: {
      id: true,
      status: true,
      startOn: true,
      name: true,
    },
    with: {
      rsvps: true,
    },
    limit: 10,
    orderBy: [asc(events.startOn)],
  })

  return data ?? []
}

export const getEventsForDashboard = memoize(getEvents, {
  persist: true,
  suppressWarnings: true,
  revalidateTags: () => ['dashboard:events'],
  log: ['datacache', 'dedupe', 'dedupe'],
  logid: 'dashboard:events',
})

export const getAllEvents = memoize(
  async (userId: string): Promise<Event[]> => {
    await delay()

    return await db.query.events.findMany({
      where: eq(events.createdById, userId),
      orderBy: [asc(events.startOn)],
    })
  },
  {
    persist: true,
    suppressWarnings: true,
    revalidateTags: () => ['events'],
    logid: 'events',
  }
)

export const getEvent = memoize(
  async (userId: string, eventId: string): Promise<Event | undefined> => {
    await delay()

    return await db.query.events.findFirst({
      where: and(eq(events.createdById, userId), eq(events.id, eventId)),
    })
  },
  {
    persist: true,
    suppressWarnings: true,
    revalidateTags: (userId, eventId) => [eventId],
    logid: 'event',
  }
)
