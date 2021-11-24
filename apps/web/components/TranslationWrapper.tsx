import { languages } from '@pabau/i18n'
import i18next from 'i18next'
import React, { FC } from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { useUser } from '../context/UserContext'

const TranslationWrapper: FC = ({ children }) => {
  const me = useUser()
  i18next.use(initReactI18next).init({
    interpolation: { escapeValue: false },
    lng: me?.me?.language?.company?.toString().slice(0, 2),
    fallbackLng: 'en',
    keySeparator: false,
    resources: languages,
  })

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
}

export default TranslationWrapper
