export function convertDecimalToHour(decimal: number) {
  const hoursInDay = 24
  const hours = decimal * hoursInDay
  const hourFloor = Math.floor(hours)
  const minutes = (hours - hourFloor) * 60

  const formattedHour = `${hourFloor}:${minutes.toFixed(0).padStart(2, '0')}h`

  return formattedHour
}
