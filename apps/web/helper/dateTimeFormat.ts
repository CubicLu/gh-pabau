interface DateTimeFormatProps {
  lan?: string
  date?: Date
}
export const dateTimeFormatter = (props: DateTimeFormatProps) => {
  const { date, lan } = props
  const dateTime = new Date(String(date)).toLocaleString(lan || 'en', {
    weekday: 'short', // long, short, narrow
    day: 'numeric', // numeric, 2-digit
    year: 'numeric', // numeric, 2-digit
    month: 'long', // numeric, 2-digit, long, short, narrow
    hour: 'numeric', // numeric, 2-digit
    minute: 'numeric', // numeric, 2-digit
    ...props,
  })
  return dateTime
}
