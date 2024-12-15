import { EVENT_STATUS_COLOR_MAP } from '@/utils/constants'
import { getEventsForDashboard } from '@/utils/events'
import { getCurrentUser } from '@/utils/users'
import { Chip } from '@nextui-org/react'
import Link from 'next/link'

export default async function EventsSlot() {
  const user = await getCurrentUser()
  const latestEvents = await getEventsForDashboard(user.id)

  return (
    <div className="w-full h-full flex justify-center p-4">
      <div className="w-full">
        <h2 className="text-center text-xl">Latest Events</h2>
        <div className="rounded-md border border-default-100 my-8">
          {latestEvents.map(({ name, id, status, startOn }) => (
            <div
              className="border-b border-default-100 p-2 flex gap-2"
              key={id}
            >
              <Link href={`/dashboard/events/${id}`}>
                <span>{name}</span>
              </Link>
              <span>
                <Chip size="sm" color={EVENT_STATUS_COLOR_MAP[status]}>
                  {status}
                </Chip>
              </span>
              <span>
                <Chip size="sm" variant="faded">
                  {startOn}
                </Chip>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
