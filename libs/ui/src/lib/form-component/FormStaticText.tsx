import { RenderHtml } from '@pabau/ui'
import React, { FC } from 'react'
import styles from './FormComponent.module.less'

interface P {
  title: string
  desc1: string
  desc2: string
  required: boolean
}

export const FormStaticText: FC<P> = ({
  title = '',
  desc1 = '',
  desc2 = '',
  required = false,
}) => {
  return (
    <div className={`${styles.formStaticText} ${styles.formComponet}`}>
      {title.length > 0 && (
        <div className={styles.staticTextTitle}>
          <RenderHtml __html={title} />
        </div>
      )}
      {desc1.length > 0 && (
        <div className={styles.staticTextDescription1}>
          <RenderHtml __html={desc1} />
        </div>
      )}
      {desc2.length > 0 && (
        <div className={styles.staticTextDescription2}>
          <RenderHtml __html={desc2} />
        </div>
      )}
    </div>
  )
}

export default FormStaticText
