import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import Signature from '../../assets/images/form-signature.svg'
import styles from './ClientFormsLayout.module.less'
import { MedicalFormContactData, RenderHtml } from '@pabau/ui'

interface FormDetailsProps {
  formData: MedicalFormContactData
}

const FormDetails: FC<FormDetailsProps> = ({ formData }) => {
  const { t } = useTranslation('common')
  console.log('formData =', formData)
  return (
    <div>
      <div className={styles.fullForm}>
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
      </div>
      {formData.details.map((detail, key) => {
        return (
          <div className={styles.fullForm} key={`form-view-${key}`}>
            <span className={styles.contentName}>
              <RenderHtml __html={detail.label} />
            </span>
            <span className={styles.contentDetail}>
              <RenderHtml __html={detail.content} />
            </span>
            <span className={styles.detailsBorder} />
          </div>
        )
      })}
    </div>
  )
}

export default FormDetails
