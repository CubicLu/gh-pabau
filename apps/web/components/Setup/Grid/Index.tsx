import { SetupGrid, SetupGridProps } from '@pabau/ui'
import React from 'react'
import styles from '../../../pages/setup/setup.module.less'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'

interface p {
  data: SetupGridProps[]
  setSMSModalVisible?: () => void
}
const Grid = (props: p) => {
  const { data, setSMSModalVisible } = props
  const { t } = useTranslationI18()
  return (
    <div className={styles.gridWrapper}>
      {data?.map((value, index) => (
        <SetupGrid
          key={index}
          {...value}
          setSMSModalVisible={setSMSModalVisible}
          expandLabel={t('setup.page.expand.label')}
        />
      ))}
    </div>
  )
}

export default Grid
