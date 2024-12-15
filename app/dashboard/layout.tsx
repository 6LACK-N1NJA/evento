'use client'

import Shell from '@/components/Shell'
import { usePathname } from 'next/navigation'

export default function DashboardLayout({ children, rsvps, events }) {
  const path = usePathname()

  return (
    <Shell>
      {path === '/dashboard' ? (
        <div className="flex w-full h-full">
          <section className="w-1/2 border-r border-default-50">{rsvps}</section>
          <div className=" w-1/2 flex flex-col">
            <section className=" border-b border-default-50 w-full h-1/2">
              {events}
            </section>
            <section className="w-full h-1/2">{children}</section>
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </Shell>
  )
}
