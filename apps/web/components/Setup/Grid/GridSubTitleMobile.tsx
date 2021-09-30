import { SetupGridProps, SetupGridSubMenuMobile } from '@pabau/ui'
import classNames from 'classnames'
import React, { FC, useEffect, useState } from 'react'
import styles from '../../Setup.module.less'

interface P {
  data: SetupGridProps[]
  handleBack: () => void
  setSMSModalVisible?: () => void
}

const GridSubMenuMobile: FC<P> = ({ handleBack, data, setSMSModalVisible }) => {
  const [subTitle, setSubTitle] = useState([])

  useEffect(() => {
    if (data && data.length > 0) {
      if (data[0]?.expandTitle)
        setSubTitle([...data[0]?.subDataTitles, ...data[0]?.expandTitle])
      else setSubTitle([...data[0]?.subDataTitles])
    }
  }, [data])

  return (
    <div
      className={classNames(styles.gridMobileWrapper, styles.desktopViewNone)}
    >
      {data?.[0]?.image && (
        <div
          style={{
            minHeight: '160px',
            backgroundImage: `url(${data?.[0]?.image})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: '160px 160px',
          }}
        />
      )}
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
