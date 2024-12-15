export default function FormErrorMessage({ message }: { message: string }) {
  return (
    <span className="text-center rounded-lg my-3 text-orange-600 bg-zinc-300 bg-opacity-30">
      {message}
    </span>
  )
}
