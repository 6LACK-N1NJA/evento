import EventsTable from '@/components/EventsTable'
import { getAllEvents } from '@/utils/events'
import { getCurrentUser } from '@/utils/users'


export default async function EventPage() {
  const user = await getCurrentUser()
  const events = await getAllEvents(user.id)

  if (events.length === 0) return <h2>No events was added</h2>

  const displayedColumns = Object.keys(events[0]).filter(
    (v) =>
      v !== 'id' &&
      v !== 'createdById' &&
      v !== 'description' &&
      v !== 'streetNumber' &&
      v !== 'bldg' &&
      v !== 'createdAt'
  )
  return (
    <section className="w-full h-full p-4">
      <EventsTable events={events} displayedColumns={displayedColumns} />
    </section>
  )
}
