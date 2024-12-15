import 'server-only'
import { db } from '@/db/db'
import { attendees, events, rsvps } from '@/db/schema'
import { and, desc, eq, inArray } from 'drizzle-orm'
import { delay } from './delay'

import { memoize } from 'nextjs-better-unstable-cache'

async function getRsvps(userId: string): Promise<any[]> {
  await delay()

  const userEvents = await db.query.events.findMany({
    where: eq(events.createdById, userId),
    columns: {
      id: true,
    },
  })

  const userEventsId: string[] = userEvents.map(({ id }) => id)
  if (userEventsId.length === 0) return []

  const data = await db
    .selectDistinct()
    .from(attendees)
    .where(inArray(rsvps.eventId, userEventsId))
    .leftJoin(rsvps, eq(attendees.id, rsvps.attendeeId))
    .leftJoin(events, eq(rsvps.eventId, events.id))
    .orderBy(desc(rsvps.createdAt))
    .execute()

  return data
}
export const getRsvpsForDashboard = memoize(getRsvps, {
  persist: true,
  suppressWarnings: true,
  revalidateTags: () => ['dashboard:rsvps'],
  log: ['datacache', 'dedupe', 'dedupe'],
  logid: 'dashboard:rsvps',
})
