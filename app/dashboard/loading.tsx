import { Spinner } from '@nextui-org/react'

export default function HomeLoader() {
  return (
    <div className="h-full flex justify-center items-center">
      <Spinner />
    </div>
  )
}
