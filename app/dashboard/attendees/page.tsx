export default function AttendeesPage(){
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Attendees</h1>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <input 
              type="search"
              placeholder="Search attendees..."
              className="rounded-lg bg-default-100 px-4 py-2"
            />
          </div>
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-default-100">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Event</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-default-100">
                <td className="px-6 py-4">John Doe</td>
                <td className="px-6 py-4">john@example.com</td>
                <td className="px-6 py-4">Summer Party</td>
                <td className="px-6 py-4">Confirmed</td>
                <td className="px-6 py-4">
                  <button className="text-primary hover:underline">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}