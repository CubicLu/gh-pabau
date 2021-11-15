//Temporary
export const hhmmToMinutes = (input: string) => {
  return (
    Number.parseInt(input.substr(0, 2)) * 60 +
    Number.parseInt(input.substr(3, 2))
  )
}
