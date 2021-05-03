export const relativeTime = (lan: string, date: Date) => {
  const date1 = new Date()
  const date2 = new Date(date)
  const rtf = new Intl.RelativeTimeFormat(lan, {
    localeMatcher: 'best fit',
    numeric: 'always',
    style: 'long',
  })
  let diffInMilliSeconds = date1.getTime() - date2.getTime()

  diffInMilliSeconds = diffInMilliSeconds / 1000
  const seconds = Math.floor(diffInMilliSeconds % 60)
  diffInMilliSeconds = diffInMilliSeconds / 60
  const minutes = Math.floor(diffInMilliSeconds % 60)
  diffInMilliSeconds = diffInMilliSeconds / 60
  const hours = Math.floor(diffInMilliSeconds % 24)
  const days = Math.floor(diffInMilliSeconds / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / (365 / 12))
  const years = Math.floor(days / 365)
  return years > 0
    ? rtf.format(-years, 'years')
    : months > 0
    ? rtf.format(-months, 'months')
    : weeks > 0
    ? rtf.format(-weeks, 'weeks')
    : days > 0
    ? rtf.format(-days, 'days')
    : hours > 0
    ? rtf.format(-hours, 'hours')
    : minutes > 0
    ? rtf.format(-minutes, 'minutes')
    : rtf.format(-seconds, 'seconds')
}
