export default function snakeCaseToTitle(initialText: string): string {
  const arr = initialText.split('')
  let result = ''

  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      result += arr[0].toUpperCase()
    } else if (arr[i].toUpperCase() === arr[i]) {
      result += ` ${arr[i].toLowerCase()}`
    } else {
      result += arr[i]
    }
  }

  return result
}
