'use client'

import { Button } from '@nextui-org/react'
import React from 'react'
import { useFormStatus } from 'react-dom'

export default function SubmitButton({ label, ...btnProps }: any) {
  const { pending } = useFormStatus()

  return (
    <Button {...btnProps} isLoading={pending} type="submit">
      {label}
    </Button>
  )
}
