import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { MedicalFormBuilder, VersionItem } from '@pabau/ui'
import { medicalFormData } from '../../../../components/MedicalForms/mock'
// import MedicalFormBuilder from '../../../../components/MedicalFormBuilderWeb/MedicalFormBuilder'

interface MedicalFormItem {
  name: string
  formType: string
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

  return (
    <div>
      <MedicalFormBuilder
        visible={true}
        previewData=""
        onCreate={() => console.log('form edited')}
        nameForm={Item.name}
      />
    </div>
  )
}

export default EditMedicalForm
