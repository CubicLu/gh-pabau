type Locale = 'en-GB'

export const useUnixDate = (
  unixDate: number,
  locale: Locale = 'en-GB'
): string => new Date(unixDate * 1000).toLocaleDateString(locale)
