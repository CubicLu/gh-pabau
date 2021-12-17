import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ClientFormsLayout.module.less'
import { MedicalFormContactData, RenderHtml, Table } from '@pabau/ui'

const colTitle = {
  name: 'Drug',
  dosage: 'Dose',
  units: 'Units',
  frequency: 'Freq',
  lotnumber: 'Lot #',
  expiry: 'Exp',
  route: 'Route',
  comments: 'Comment',
}

interface FormDetailsProps {
  formData: MedicalFormContactData
  formId?: number
}

const DrugsTable = ({ drugs }) => {
  const [drugItems, setDrugItems] = useState([])
  const [columns, setColumns] = useState<string[]>([])

  useEffect(() => {
    if (drugs) {
      const cDrugs = JSON.parse(drugs)

      const colsDrugsIndex = cDrugs
        .map((a) => a.length)
        .indexOf(Math.max(...cDrugs.map((a) => a.length)))
      const cols = cDrugs?.[colsDrugsIndex]?.map((el) => el?.name)

      const dItems = []
      for (const drug of cDrugs) {
        const cDrug = { key: drug?.find((el) => el?.name === 'id')?.value }
        for (const col of cols) {
          cDrug[col] = drug?.find((d) => d?.name === col)?.value
        }
        dItems.push(cDrug as never)
      }

      const cCols = cols?.filter((col) => {
        let valExist = false
        for (const dItem of dItems) {
          if (dItem[col] && dItem[col] !== '') valExist = true
        }
        return valExist
      })
      setColumns(cCols)
      setDrugItems(dItems)
    }
  }, [drugs])

  return (
    <div className={styles.drugsTable}>
      <Table
        columns={columns?.map((el) => ({
          title: colTitle[el],
          dataIndex: el,
          visible: el === 'id' ? false : true,
          className: 'drug-rows',
        }))}
        dataSource={drugItems}
        bordered
        pagination={false}
        noDataText="No drugs added"
        scroll={{ x: 'max-content' }}
      />
    </div>
  )
}

const imageAttrs = [
  'image',
  'diagram',
  'signature',
  'facediagram',
  'staticImage',
  'diagram_mini',
  'photo_and_drawer',
  'photo_andcontentDetail_drawer',
]
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

  return source ? <img src={source} alt="" /> : <div />
}

const FormDetails: FC<FormDetailsProps> = ({ formData, formId }) => {
  const { t } = useTranslation('common')

  return (
    <div id={`form-details-${formId}`}>
      {/* TODO */}
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
            key={`form-view-${key}`}
            id="fullForm"
            data-value={`${detail.clsClass}`}
          >
            <span className={styles.contentName} id="contentName">
              <RenderHtml __html={detail.label} />
            </span>
            {imageAttrs?.includes(detail?.clsClass) && (
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
            {!imageAttrs?.includes(detail?.clsClass) &&
              detail?.clsClass !== 'cl_drugs' && (
                <span className={styles.contentDetail} id="contentDetail">
                  <RenderHtml __html={detail.content} />
                </span>
              )}
            {detail?.clsClass === 'cl_drugs' && (
              <span className={styles.contentDetail} id="contentDetail">
                <DrugsTable drugs={detail.content} />
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
