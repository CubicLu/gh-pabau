import React, { FC, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { languages } from '@pabau/i18n'

const TranslationWrapper: FC = ({ children }) => {
  const user = useContext(UserContext)

  i18next.use(initReactI18next).init({
    interpolation: { escapeValue: false },
    lng:
      user?.data?.me?.company?.details?.language?.toString().slice(0, 2) ??
      'en',
    fallbackLng: 'en',
    keySeparator: false,
    resources: languages,
  })

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
}

export default TranslationWrapper
