export function stringToJavaScriptDate(dateString: string) {
  const dateParts = dateString.split('/')
  const formattedDate =
    dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0] + 'T00:01:00'

  return formattedDate
}

export function formatDateToDDMMYYYY(date: string) {
  const dateToFormat = new Date(date)

  const day = String(dateToFormat.getUTCDate()).padStart(2, '0')
  const month = String(dateToFormat.getUTCMonth() + 1).padStart(2, '0')
  const year = dateToFormat.getUTCFullYear().toString().slice(-2)
  return `${day}/${month}/${year}`
}
