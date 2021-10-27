export const decimalToISO8601 = (decimalDate: number) => {
  return (
    decimalDate.toString().substring(0, 4) +
    '-' +
    decimalDate.toString().substring(4, 6) +
    '-' +
    decimalDate.toString().substring(6, 8) +
    ' ' +
    decimalDate.toString().substring(8, 10) +
    ':' +
    decimalDate.toString().substring(10, 12) +
    ':' +
    decimalDate.toString().substring(12, 14)
  )
}
