export function stringToJavaScriptDate(dateString: string) {
  const dateParts = dateString.split('/')
  const formattedDate =
    dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0] + 'T00:01:00'

  return formattedDate
}

export function formatDateToDDMMYY(date: string) {
  const dateToFormat = new Date(date)

  const day = String(dateToFormat.getUTCDate()).padStart(2, '0')
  const month = String(dateToFormat.getUTCMonth() + 1).padStart(2, '0')
  const year = dateToFormat.getUTCFullYear().toString().slice(-2)
  return `${day}/${month}/${year}`
}

export function formatDateToDDMMYYYY(date: string) {
  const dateToFormat = new Date(date)

  const day = String(dateToFormat.getUTCDate()).padStart(2, '0')
  const month = String(dateToFormat.getUTCMonth() + 1).padStart(2, '0')
  const year = dateToFormat.getUTCFullYear().toString()
  return `${day}/${month}/${year}`
}

export function formatToAmericanDate(date: string) {
  const parts = date.split('/')
  if (parts.length === 3) {
    const [day, month, year] = parts
    return `${year}-${month}-${day}`
  } else {
    return null
  }
}
