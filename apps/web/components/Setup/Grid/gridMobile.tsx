import React from 'react'
import { SetupGridMobile, SubDataTitle } from '@pabau/ui'
import styles from '../../../pages/setup/Setup.module.less'

interface SetupGridMobileProps {
  image: string
  title: string
  subDataTitles: SubDataTitle[]
  keyValue: string
}

interface p {
  data: SetupGridMobileProps[]
  handleShowSubMenuMobile?: (title: string) => void
}
const Grid = (props: p) => {
  const { data } = props
  return (
    <div className={styles.gridMobileWrapper}>
      {data?.map((value, index) => (
        <SetupGridMobile
          keyValue={value.keyValue}
          key={index}
          {...value}
          onClick={props.handleShowSubMenuMobile}
        />
      ))}
    </div>
  )
}

export default Grid
