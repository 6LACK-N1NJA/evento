'use client'
import { Input } from '@nextui-org/react'
import Link from 'next/link'
import SubmitButton from './SubmitButton'
import { useFormState } from 'react-dom'
import { signinUser } from '@/actions/auth'
import FormErrorMessage from './FormErrorMessage'

const initialState = { message: null }

const SigninForm = () => {
  const [formState, action] = useFormState<{ message: string | null }>(
    signinUser,
    initialState
  )
  return (
    <form
      action={action}
      className="bg-content1 border border-default-100 shadow-lg rounded-md p-3 flex flex-col gap-2 "
    >
      <h3 className="my-4">Sign in</h3>
      <Input
        fullWidth
        required
        size="lg"
        placeholder="Email"
        name="email"
      />
      <Input
        name="password"
        fullWidth
        required
        size="lg"
        type="password"
        placeholder="Password"
      />
      {formState.message && <FormErrorMessage message={formState.message} />}
      <SubmitButton label="Sign in" />
      <div>
        <Link href="/signup">{`Don't have an account?`}</Link>
      </div>
    </form>
  )
}

export default SigninForm
