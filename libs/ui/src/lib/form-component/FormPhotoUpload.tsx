import { PlusOutlined } from '@ant-design/icons'
import { Button, ButtonTypes, OptionType } from '@pabau/ui'
import React, { FC, useEffect, useState } from 'react'
import innerDrawingIcon from '../../assets/images/medicalform_innerdrawing.svg'
import styles from './FormComponent.module.less'

interface P {
  title: string
  desc: string
  paramItems: OptionType[]
  required: boolean
}

export const FormPhotoUpload: FC<P> = ({
  title = '',
  desc = '',
  paramItems,
  required = false,
}) => {
  const [items, setItems] = useState<OptionType[]>([])

  useEffect(() => {
    setItems(paramItems)
  }, [paramItems])
  return (
    <div className={`${styles.formPhotoUpload} ${styles.formComponet}`}>
      {title.length > 0 && (
        <div className={styles.formComponentTitle}>
          {title}
          {required && <span className={styles.formRequiredMark}>*</span>}
        </div>
      )}
      {desc.length > 0 && (
        <div className={styles.formComponentChoiceDescription}>{desc}</div>
      )}
      <div className={styles.formPhotoUploadOptions}>
        <img
          src={
            items?.length > 0 && items[0].name !== ''
              ? `https://prelive-crm.pabau.com${items[0].name}`
              : innerDrawingIcon
          }
          alt=""
        />
      </div>
      <div className={styles.formPhotoUploadButtons}>
        <Button type={ButtonTypes.primary} icon={<PlusOutlined />} size="small">
          Choose file
        </Button>

        <Button type={ButtonTypes.default} size="small">
          Remove
        </Button>
      </div>
    </div>
  )
}

export default FormPhotoUpload
