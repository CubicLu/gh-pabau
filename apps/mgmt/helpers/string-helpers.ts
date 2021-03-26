export const slugToTitle = (str: string) => {
  const parts = str.split('/')
  return parts[parts.length - 1].replace('-', ' ')
}
