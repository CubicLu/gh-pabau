import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Col, Row, Skeleton } from 'antd'
import ClassNames from 'classnames'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './BusinessTypes.module.less'

export interface IOption {
  onselected: boolean
  title: string
  icon: string
  key: string
}

export interface BusinessTypesProps {
  List: IOption[]
  loading?: boolean
  onSelect?(val: IOption[]): void
}

export const BusinessTypes: FC<BusinessTypesProps> = ({
  List,
  onSelect,
  loading,
}) => {
  const { t } = useTranslation('common')
  const [lists, setList] = useState([...List])
  const [isCollapsed, setIsCollapsed] = useState(false)
  const handleClickItem = (val) => {
    const list = [...lists]
    const index = list.findIndex((item) => item.title === val)
    if (list[index].onselected === true) {
      list[index].onselected = false
    } else {
      list[index].onselected = true
    }
    setList(list)
    onSelect?.(list)
  }
  return (
    <div className={styles.businessTypesContainer}>
      <p>
        {t('business.details.business.type.title')}{' '}
        {isCollapsed ? (
          <UpOutlined onClick={() => setIsCollapsed(false)} />
        ) : (
          <DownOutlined onClick={() => setIsCollapsed(true)} />
        )}
      </p>
      <div
        className={styles.businessTypes}
        style={{ display: !isCollapsed ? 'none' : '' }}
      >
        <Row gutter={[8, 8]}>
          {lists?.map((type) => (
            <Col xl={2} lg={3} md={4} sm={6} xs={8} key={type.key}>
              <div
                className={
                  type.onselected
                    ? ClassNames(
                        styles.businessType,
                        styles.businessTypeSelected
                      )
                    : styles.businessType
                }
                key={type.title}
                onClick={() => handleClickItem(type.title)}
              >
                {!loading ? (
                  <div className={styles.businessTypeContent}>
                    <img
                      src={type.icon}
                      width="40px"
                      height="40px"
                      alt="biz type"
                    />
                    <p>{type.title}</p>
                  </div>
                ) : (
                  <Skeleton.Input
                    active={true}
                    size={'small'}
                    style={{ height: 94 }}
                  />
                )}
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default BusinessTypes
