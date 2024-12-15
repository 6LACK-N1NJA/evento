'use client'

import { EventCreateData } from '@/actions/events'
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
  ModalContent,
  useDisclosure,
  Button,
  DatePicker,
  Switch,
} from '@nextui-org/react'
import { useState, useTransition } from 'react'
import { CirclePlus } from 'lucide-react'

export default function CreateEventDialog({
  createHandler,
}: {
  createHandler: (eventData: EventCreateData) => void
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const initialState: EventCreateData = {
    name: '',
    startOn: '',
    isPrivate: false,
  }
  const [eventData, setEventData] = useState(initialState)
  const [isPending, startTransition] = useTransition()
  
  const handlerWithTransition = (onClose: any) => () => {
    startTransition(() => createHandler(eventData))
    onClose()
  }
  return (
    <>
      <Button isLoading={isPending} className="flex justify-around h-1/2" onPress={onOpen}>
        <CirclePlus size={16} /> 
        <span>Create Event</span>
      </Button>
      <Modal
        size="md"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-2">
                Create Event
              </ModalHeader>
              <ModalBody className="flex flex-col gap-7">
                <Input
                  label="Event Name"
                  onChange={({ target }) =>
                    setEventData({ ...eventData, name: target.value })
                  }
                />
                <DatePicker
                  label="Start Date"
                  onChange={(value) =>
                    setEventData({ ...eventData, startOn: value.toString() })
                  }
                />
                <Switch
                  isSelected={eventData.isPrivate}
                  onValueChange={(value) =>
                    setEventData({ ...eventData, isPrivate: value })
                  }
                >
                  Private Event
                </Switch>
              </ModalBody>
              <ModalFooter className="flex justify-around">
                <Button className='w-1/3' onClick={handlerWithTransition(onClose)}>Create</Button>
                <Button className='w-1/3' onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
