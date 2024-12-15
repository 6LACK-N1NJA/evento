import { getEvent } from "@/utils/events";
import { getCurrentUser } from "@/utils/users";

export default async function EventPage({ params }: { parmas: any }) {
    const user = await getCurrentUser()
    const event = await getEvent(user.id, params.id)

    return <div className="h-full w-full p-4 flex flex-col gap-3">
        {Object.keys(event).map((v) => <div key={v}>{`${v}: ${event[v]}`}</div>)}
    </div>
}