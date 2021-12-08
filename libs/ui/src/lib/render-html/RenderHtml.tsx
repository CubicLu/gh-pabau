import React, { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'

interface P {
  __html: string
}

const escapeAmbigousChar = (html) => {
  return html?.toString()?.replaceAll("\\'", "'")
}

export const RenderHtml: FC<P> = ({ __html = '' }) => {
  return <div>{ReactHtmlParser(escapeAmbigousChar(__html))}</div>
}

export default RenderHtml
