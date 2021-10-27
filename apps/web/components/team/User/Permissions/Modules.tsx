import React, { FC, useState } from 'react'
import { Permission, PermissionFieldType, SimpleDropdown } from '@pabau/ui'
import styles from '../UserDetail.module.less'

interface ModulesProps {
  handleModuleSaveChanges: (field: PermissionFieldType[]) => void
  PermissionFields: PermissionFieldType[]
}
const Modules: FC<ModulesProps> = ({
  handleModuleSaveChanges,
  PermissionFields,
}) => {
  const [mainFields, setMainFields] = useState<PermissionFieldType[]>(
    PermissionFields
  )

  const UnCheckAll = () => {
    for (const f of mainFields) {
      for (const data of f.container) {
        data.value = false
      }
    }
    setMainFields([...mainFields])
    handleModuleSaveChanges(mainFields)
  }

  const CheckAll = () => {
    for (const f of mainFields) {
      for (const data of f.container) {
        data.value = true
      }
    }
    setMainFields([...mainFields])
    handleModuleSaveChanges(mainFields)
  }

  const onChange = (index: number, ind: number) => {
    mainFields[index].container[ind].value = !mainFields[index].container[ind]
      .value
    setMainFields([...mainFields])
    handleModuleSaveChanges(mainFields)
  }

  const handleRoleSelect = (val) => {
    return val
  }

  return (
    <div className={styles.moduleWrapper}>
      <div className={styles.moduleContent}>
        <div className={styles.moduleHeader}>
          <h5>Modules</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>
        <div className={styles.roleDropdown}>
          <SimpleDropdown
            label={'Role'}
            dropdownItems={['']}
            onSelected={() => handleRoleSelect}
          />
        </div>
      </div>
      <Permission
        fields={mainFields}
        onChange={onChange}
        onCheckAllClicked={CheckAll}
        onUnCheckAllClicked={UnCheckAll}
      />
    </div>
  )
}

export default Modules
