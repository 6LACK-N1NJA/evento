'use client'
import { createNewEvent } from '@/actions/events'
import { Input } from '@nextui-org/react'
import CreateEventDialog from './CreateEventDialog'
import { useTransition } from 'react'

const Nav = () => {
  
  return (
    <nav className="h-[65px] border-b border-default-50 flex items-center px-6 gap-4">
      <CreateEventDialog createHandler={createNewEvent} />
      <div className="w-1/2">
        <Input size="sm" variant="faded" placeholder="search" />
      </div>
    </nav>
  )
}

export default Nav
