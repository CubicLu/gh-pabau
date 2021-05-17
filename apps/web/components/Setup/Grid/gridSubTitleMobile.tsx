import React, { useState, useEffect, FC } from 'react'
import { LeftOutlined } from '@ant-design/icons'
import { SetupGridSubMenuMobile, SetupGridProps } from '@pabau/ui'
import styles from '../../Setup.module.less'
import classNames from 'classnames'

interface P {
  data: SetupGridProps[]
  handleBack: () => void
  setSMSModalVisible?: () => void
}

const GridSubMenuMobile: FC<P> = ({ handleBack, data, setSMSModalVisible }) => {
  const [subTitle, setSubTitle] = useState([])

  useEffect(() => {
    if (data && data.length > 0) {
      setSubTitle([...data[0].subDataTitles, ...data[0].expandTitle])
    }
  }, [data])

  return (
    <div
      className={classNames(styles.gridMobileWrapper, styles.desktopViewNone)}
    >
      <div className={styles.listIcon}>
        <LeftOutlined onClick={handleBack} />
        <div className={styles.textContent}>
          {data && data.length > 0 ? data[0].title : ''}
        </div>
      </div>
      {subTitle &&
        subTitle.length > 0 &&
        subTitle.map((value, index) => (
          <SetupGridSubMenuMobile
            key={index}
            subTitleData={value}
            setSMSModalVisible={setSMSModalVisible}
          />
        ))}
    </div>
  )
}

export default GridSubMenuMobile
