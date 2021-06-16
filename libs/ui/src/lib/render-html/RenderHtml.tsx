import React, { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'

interface P {
  __html: string
}

export const RenderHtml: FC<P> = ({ __html = '' }) => {
  return <div>{ReactHtmlParser(__html)}</div>
}

export default RenderHtml
