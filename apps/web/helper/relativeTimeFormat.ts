export const relativeTime = (lan: string, date: Date) => {
  const date1 = new Date()
  const date2 = new Date(date)
  const rtf = new Intl.RelativeTimeFormat(lan, {
    localeMatcher: 'best fit',
    numeric: 'auto',
    style: 'long',
  })

  let diffInMilliSeconds = date1.getTime() - date2.getTime()
  diffInMilliSeconds = diffInMilliSeconds / 1000
  const seconds = diffInMilliSeconds % 60
  diffInMilliSeconds = diffInMilliSeconds / 60
  const minutes = diffInMilliSeconds % 60
  diffInMilliSeconds = diffInMilliSeconds / 60
  const hours = diffInMilliSeconds % 24
  const days = diffInMilliSeconds / 24
  const weeks = days / 7
  const months = days / (365 / 12)
  const years = days / 365

  return Math.abs(years) >= 1
    ? rtf.format(-Math.floor(years), 'years')
    : Math.abs(months) >= 1
    ? rtf.format(-Math.floor(months), 'months')
    : Math.abs(weeks) >= 1
    ? rtf.format(-Math.floor(weeks), 'weeks')
    : Math.abs(days) >= 1
    ? rtf.format(-Math.floor(days), 'days')
    : Math.abs(hours) >= 1
    ? rtf.format(-Math.floor(hours), 'hours')
    : Math.abs(minutes) >= 1
    ? rtf.format(-Math.floor(minutes), 'minutes')
    : rtf.format(-Math.floor(seconds), 'seconds')
}
