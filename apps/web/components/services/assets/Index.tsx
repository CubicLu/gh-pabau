import React, { FC } from 'react'
import Donating from './Donate'
import Doting from './Dots'
import Filing from './File'
import Foldering from './Folder'
import Globing from './Globe'
import Injecting from './Injection'
import Keying from './Key'
import Teaming from './Team'

const Index: FC = () => {
  return <div></div>
}

export const Dots: FC = () => {
  return <Doting />
}

export const Donate: FC = () => {
  return <Donating />
}

export const Injection: FC = () => {
  return <Injecting />
}

export const Key: FC = () => {
  return <Keying />
}

export const Globe: FC = () => {
  return <Globing />
}

export const Team: FC = () => {
  return <Teaming />
}

export const File: FC = () => {
  return <Filing />
}

export const Folder: FC = () => {
  return <Foldering />
}

export default Index
