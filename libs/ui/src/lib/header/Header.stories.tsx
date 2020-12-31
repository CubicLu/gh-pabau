/* eslint-disable */
import React from 'react'
// import { Header2 } from './Header'
import { PabauHeader } from './PabauHeader'
import { Logo } from './logo/Logo'
import { Search } from './search/search'

export default {
  component: PabauHeader,
  title: 'Header',
}

export const PabauHeaderStory = () => {
  return <PabauHeader />
}
export const PabauLogo = () => {
  return <Logo />
}

export const PabauSearch = () => {
  return <Search />
}