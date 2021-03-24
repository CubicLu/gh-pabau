import { addDecorator } from '@storybook/react'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'
import 'react-phone-input-2/lib/style.css'
import 'react-quill/dist/quill.snow.css'
import 'react-image-crop/dist/ReactCrop.css'
import { withI18next } from 'storybook-addon-i18next'
import '../src/assets/fonts/fonts.css'
import { languages } from '@pabau/i18n'
require('../src/styles/antd.less')
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    whitelist: ['en', 'de', 'fr'],
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: languages,
    keySeparator: false,
  })

addDecorator(
  withI18next({
    i18n,
    languages: {
      en: 'English',
      de: 'German',
      fr: 'French',
    },
  })
)

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'centered',
}
