import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ClientFormsLayout.module.less'
import { MedicalFormContactData, RenderHtml } from '@pabau/ui'

interface FormDetailsProps {
  formData: MedicalFormContactData
  formId?: number
}

const Signature = ({ origin }) => {
  const [source, setSource] = useState('')

  useEffect(() => {
    if (source === '' && origin !== '') {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.addEventListener('load', () => {
        //draw origin image
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          0,
          0,
          img.width,
          img.height
        )
        setSource(canvas.toDataURL())
      })
      img.addEventListener('error', () => {
        setSource('')
      })
      img.src = origin
    }
  }, [origin, source])

  return source ? (
    <img
      style={{
        width: '300px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      src={source}
      alt=""
    />
  ) : (
    <div />
  )
}

const FormDetails: FC<FormDetailsProps> = ({ formData, formId }) => {
  const { t } = useTranslation('common')

  return (
    <div id={`form-details-${formId}`}>
      {/* <div className={styles.fullForm}>
        <span className={styles.contentName}>
          {t('ui.clientcard.forms.patient')}
        </span>
        <span className={styles.contentDetail}>{formData.patient}</span>
        <span className={styles.detailsBorder} />
      </div>
      <div className={styles.fullForm}>
        <span className={styles.contentName}>
          {t('ui.clientcard.forms.lastupdate')}
        </span>
        <span className={styles.contentDetail}>
          {dayjs(formData.lastUpdate).format('DD MMM YYYY')}
        </span>
        <span className={styles.detailsBorder} />
      </div>
      <div className={styles.fullForm}>
        <span className={styles.contentName}>
          {t('ui.clientcard.forms.createdon')}
        </span>
        <span className={styles.contentDetail}>
          {dayjs(formData.createdOn).format('DD MMM YYYY')}
        </span>
        <span className={styles.detailsBorder} />
      </div>
      <div className={styles.fullForm}>
        <span className={styles.contentName}>
          {t('ui.clientcard.forms.createdby')}
        </span>
        <span className={styles.contentDetail}>{formData.createdBy}</span>
        <span className={styles.detailsBorder} />
      </div> */}
      {formData?.details?.map((detail, key) => {
        return (
          <div
            className={styles.fullForm}
            id="fullForm"
            key={`form-view-${key}`}
          >
            <span className={styles.contentName} id="contentName">
              <RenderHtml __html={detail.label} />
            </span>
            {(detail.clsClass === 'image' ||
              detail.clsClass === 'signature' ||
              detail.clsClass === 'diagram' ||
              detail.clsClass === 'diagram_mini' ||
              detail.clsClass === 'facediagram' ||
              detail.clsClass === 'photo_andcontentDetail_drawer') && (
              <span className={styles.contentDetail} id="contentDetail">
                <Signature
                  origin={
                    detail.content?.length > 0
                      ? `https://cdn.pabau.com${detail.content}`
                      : ''
                  }
                />
              </span>
            )}
            {!(
              detail.clsClass === 'image' ||
              detail.clsClass === 'signature' ||
              detail.clsClass === 'diagram' ||
              detail.clsClass === 'diagram_mini' ||
              detail.clsClass === 'facediagram' ||
              detail.clsClass === 'photo_and_drawer'
            ) && (
              <span className={styles.contentDetail} id="contentDetail">
                <RenderHtml __html={detail.content} />
              </span>
            )}

            <span className={styles.detailsBorder} id="detailsBorder" />
          </div>
        )
      })}
    </div>
  )
}

export default FormDetails
