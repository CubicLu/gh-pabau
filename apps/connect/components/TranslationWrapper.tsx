import { languages } from '@pabau/i18n'
import i18next from 'i18next'
import React, { FC, useContext } from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'

const TranslationWrapper: FC = ({ children }) => {

  i18next.use(initReactI18next).init({
    interpolation: { escapeValue: false },
    lng: 'en',
    keySeparator: false,
    resources: languages,
  })

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
}

export default TranslationWrapper
