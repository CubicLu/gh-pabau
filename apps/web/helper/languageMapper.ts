const languageMap = {
  french: 'fr',
  german: 'de',
  'english (uk)': 'en-uk',
  'english (us)': 'en-us',
  english: 'en',
}

export const languageMapper = (language: string) => {
  return languageMap[language.toLowerCase()]
}
