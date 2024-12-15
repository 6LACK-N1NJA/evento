import { db } from '@/db/db'
import { events, attendees, rsvps } from '@/db/schema'

const seedDatabase = async () => {
  try {
    const newUser = await db.query.users.findFirst()

    if (!newUser) {
      console.error('create an account first')
      return
    }

    const newEvents = await db
      .insert(events)
      .values([
        {
          name: 'Berlin Photo Trip',
          startOn: '2025-03-10',
          createdById: newUser.id,
          description: 'Do street photos and have fun',
          streetNumber: 5,
          street: 'Anklamer Straße',
          zip: 10115,
          bldg: '13A',
          isPrivate: false,
          status: 'draft',
        },
        {
          name: 'Mojacar Chill Vibes',
          startOn: '2024-11-30',
          createdById: newUser.id,
          description: 'Enjoy Andalucia, good weather and friendly people',
          streetNumber: 7,
          street: 'Calle Embajadores',
          zip: 4638,
          bldg: '21',
          isPrivate: true,
          status: 'live',
        },
      ])
      .returning()

    // Adding attendees
    const newAttendees = await db
      .insert(attendees)
      .values([
        {
          email: 'mila.bludov@example.com',
          name: 'Mila Bludov',
        },
        {
          email: 'kate.wonderland@example.com',
          name: 'Kate Wonderland',
        },
      ])
      .returning()

    console.log('Attendees added:', newAttendees.length)

    // Adding RSVPs for each attendee to each event
    const data = newAttendees
      .map((attendee) =>
        newEvents.map((event) => ({
          attendeeId: attendee.id,
          eventId: event.id,
          status: 'going',
        }))
      )
      .flat()

    const newRSVPs = await db.insert(rsvps).values(data).returning()
    console.log('created rsvps ', newRSVPs.length)
  } catch (error) {
    console.error('Failed to seed database:', error)
  }
}

seedDatabase()
