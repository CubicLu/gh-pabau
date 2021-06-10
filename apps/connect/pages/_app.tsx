import React from 'react'
import { AppProps } from 'next/app'
import TranslationWrapper from '../components/TranslationWrapper'

function Connect({ Component, pageProps }: AppProps) {
  return (
    <TranslationWrapper>
      <Component {...pageProps} />
    </TranslationWrapper>
  )
}

export default Connect
