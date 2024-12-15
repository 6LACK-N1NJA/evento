import { RSVPS_STATUS_COLOR_MAP } from '@/utils/constants'
import { getRsvpsForDashboard } from '@/utils/rsvps'
import { getCurrentUser } from '@/utils/users'
import { Chip } from '@nextui-org/react'
import Link from 'next/link'

export default async function RsvpsSlot() {
  const user = await getCurrentUser()
  const data = await getRsvpsForDashboard(user.id)

  return (
    <section className="w-full h-full p-4 flex justify-center">
      <div className="w-full">
        <h2 className="text-center text-xl">RSVPS</h2>
        <div className="border border-default-100 my-8">
          {data.map(({ rsvps, attendees, events }) => (
            <div
              className="border-b border-default-100 p-2 flex gap-2"
              key={rsvps.id}
            >
              <Link href={`/dashboard/rsvps/${rsvps.id}`}>
                <span>{attendees.name}</span>
              </Link>
              <span>
                <Chip size="sm" color={RSVPS_STATUS_COLOR_MAP[rsvps?.status]}>
                  {rsvps?.status}
                </Chip>
              </span>
              <span>
                <Chip size="sm" variant="faded">
                  {events.name}
                </Chip>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
