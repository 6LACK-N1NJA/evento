import { getAttendeesCount } from "@/utils/attendees"
import { getCurrentUser } from "@/utils/users"

export default async function Home(){
  const user = await getCurrentUser()
  const attendeesCount = await getAttendeesCount(user.id)
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div>
        <h4 className="text-lg">Attendees</h4>
        <h3 className="text-6xl font-semibold text-center my-8">{attendeesCount}</h3>
      </div>
    </div>
  )
}
