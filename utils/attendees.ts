import 'server-only'
import { db } from '@/db/db'
import { attendees, events, rsvps } from '@/db/schema'
import { eq, sql } from 'drizzle-orm'
import { delay } from './delay'
import { memoize } from 'nextjs-better-unstable-cache'

async function getAttendees(userId: string): Promise<number> {
  await delay()
  
  const count = await db
    .select({ totalAttendees: sql<number>`COALESCE(count(distinct ${attendees.id}), 0)` })
    .from(events)
    .leftJoin(rsvps, eq(rsvps.eventId, events.id))
    .leftJoin(attendees, eq(attendees.id, rsvps.attendeeId))
    .where(eq(events.createdById, userId))
    .groupBy(events.id)
    .execute()

    return count.reduce((acc, { totalAttendees }) => acc + totalAttendees, 0);
}
 
export const getAttendeesCount = memoize(getAttendees, {
  persist: true,
  suppressWarnings: true,
  revalidateTags: () => ['dashboard:attendees'],
  log: ['datacache', 'dedupe', 'dedupe'],
  logid: 'dashboard:attendees',
})