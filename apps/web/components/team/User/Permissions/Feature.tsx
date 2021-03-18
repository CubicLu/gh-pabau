import React, { FC, useState } from 'react'
import { FeaturePermission, FeaturePermissionProps } from '@pabau/ui'

interface FeatureProps {
  handleFeatureSaveChanges: (field: FeaturePermissionProps[]) => void
  FeatureFields: FeaturePermissionProps[]
}

const Feature: FC<FeatureProps> = ({
  handleFeatureSaveChanges,
  FeatureFields,
}) => {
  const [mainFeature, setFeature] = useState<FeaturePermissionProps[]>(
    FeatureFields
  )

  const UnCheckAll = (rowId: string) => {
    const features = mainFeature
    features.map((thread) => {
      if (thread.id === rowId) {
        for (const f of thread.permissionFields) {
          for (const data of f.container) {
            data.value = false
          }
        }
      }
      return thread
    })
    setFeature([...features])
    handleFeatureSaveChanges(features)
  }

  const CheckAll = (rowId: string) => {
    const features = mainFeature
    features.map((thread) => {
      if (thread.id === rowId) {
        for (const f of thread.permissionFields) {
          for (const data of f.container) {
            data.value = true
          }
        }
      }
      return thread
    })
    setFeature([...features])
    handleFeatureSaveChanges(features)
  }

  const onChange = (index: number, ind: number, rowId: string) => {
    const features = mainFeature
    features.map((thread) => {
      if (thread.id === rowId) {
        thread.permissionFields[index].container[ind].value = !thread
          .permissionFields[index].container[ind].value
      }
      return thread
    })
    setFeature([...features])
    handleFeatureSaveChanges(features)
  }

  return (
    <FeaturePermission
      feature={mainFeature}
      onChange={onChange}
      CheckAll={CheckAll}
      UnCheckAll={UnCheckAll}
    />
  )
}

export default Feature
