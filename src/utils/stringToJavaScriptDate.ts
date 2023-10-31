export function stringToJavaScriptDate(dateString: string) {
  const dateParts = dateString.split('/')
  const formattedDate =
    dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0] + 'T00:01:00'

  return formattedDate
}
