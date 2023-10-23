export function numberRouding(number) {
  if (number % 1 !== 0) {
    return number.toFixed(2)
  }
  return number
}
