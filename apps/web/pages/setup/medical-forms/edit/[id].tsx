import { MedicalFormBuilder, VersionItem } from '@pabau/ui'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { medicalFormData } from '../../../../components/MedicalForms/mock'

interface MedicalFormItem {
  name: string
  formType: string
  serviceId: string
  createdAt: string
  version: MedicalFormVersion
  status: string
  index?: number | string
}

interface CustomProps {
  data?: MedicalFormItem[]
}

interface MedicalFormVersion {
  currentVersion: string
  history: {
    [key: string]: VersionItem[]
  }
}

const defaultData: MedicalFormItem[] = medicalFormData

export const EditMedicalForm: React.FC<CustomProps> = ({ data }) => {
  const router = useRouter()
  const findID = +router.query.id
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [medicalFormitems, setMedicalFormItems] = useState<MedicalFormItem[]>(
    defaultData
  )
  const Item = medicalFormitems.find((item) => item.index === findID)

  const hideFormBuilder = () => {
    console.log('calling hideFormBuilder')
  }

  return (
    <div>
      <MedicalFormBuilder
        visible={true}
        previewData=""
        onHideFormBuilder={hideFormBuilder}
        preFormName={Item.name}
        preFormType={Item.formType}
        preFormServices={Item.serviceId}
      />
    </div>
  )
}

export default EditMedicalForm
