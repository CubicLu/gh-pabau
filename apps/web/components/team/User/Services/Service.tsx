import React, { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button, CheckboxTree, Notification, NotificationType } from '@pabau/ui'
import { Skeleton } from 'antd'
import { useTranslation } from 'react-i18next'
import styles from './Service.module.less'
import {
  useGetActiveServiceCategoriesQuery,
  useGetStaffServicesQuery,
} from '@pabau/graphql'

const Service: FC = () => {
  const { t } = useTranslation('common')
  const [expandedKeys, setExpandedKeys] = useState([])
  const [checkedKeys, setCheckedKeys] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const userId = Number(router.query['id'])
  const [serviceCategoriesData, setServiceCategoriesData] = useState([])
  const {
    data: serviceCategoryData,
    loading: serviceCategoryLoading,
  } = useGetActiveServiceCategoriesQuery()
  const {
    data: staffServiceData,
    loading: staffServiceLoading,
  } = useGetStaffServicesQuery({
    variables: { userID: userId },
    skip: !userId,
  })
  useEffect(() => {
    const obj = [
      {
        title: 'Select all',
        key: 'all',
        children: [],
      },
    ]
    setExpandedKeys(['all'])
    if (serviceCategoryData?.ServiceCategories) {
      const response = serviceCategoryData?.ServiceCategories
      if (response.length > 0) {
        for (const d of response) {
          const subObj = {
            title: d.name,
            key: d.id.toString(),
            count: d.Services.length ?? 0,
          }
          if (d.Services.length > 0) {
            subObj['children'] = []
            for (const val of d.Services) {
              subObj['children'].push({
                title: val.name,
                key: val.id.toString(),
              })
            }
          }
          obj[0].children.push(subObj)
        }
      }
      setServiceCategoriesData(obj)
    }
  }, [serviceCategoryData, serviceCategoryLoading])
  useEffect(() => {
    const staffServiceIds = []
    if (staffServiceData?.getStaffServices) {
      for (const d of staffServiceData?.getStaffServices) {
        staffServiceIds.push(d.id.toString())
      }
    }
    setCheckedKeys(staffServiceIds)
  }, [staffServiceData, staffServiceLoading])
  useEffect(() => {
    if (
      !serviceCategoryLoading &&
      !staffServiceLoading &&
      ((userId && checkedKeys.length > 0) ||
        (!userId && checkedKeys.length === 0))
    ) {
      setIsLoading(false)
    }
  }, [serviceCategoryLoading, staffServiceLoading, checkedKeys, userId])
  const [autoExpandParent, setAutoExpandParent] = useState(true)

  const onExpand = (expandedKeysValue: string[]) => {
    setExpandedKeys(expandedKeysValue)
    setAutoExpandParent(false)
  }

  const onCheck = (checkedKeysValue: string[]) => {
    setCheckedKeys(checkedKeysValue)
  }

  const handleSaveChanges = () => {
    Notification(NotificationType.success, 'Success! Saved changes.')
  }
  const handleTitle = (d) => {
    if (d.count > 0) {
      return (
        <div key={d.key} className={styles.titleCountWrapper}>
          {d.title}
          <div className={styles.countWrapper}>
            <div className={styles.countContainer}>{d.count}</div>
          </div>
        </div>
      )
    } else {
      return <div className={styles.titleCountWrapper}>{d.title}</div>
    }
  }
  const setCheckboxSkeleton = (padding, i) => (
    <div key={i} className={`${styles.skeletonCheckboxWrapper} ${padding}`}>
      <Skeleton.Input active={true} className={styles.skeletonCheckbox} />

      <Skeleton.Input active={true} className={styles.skeletonText} />
    </div>
  )
  return (
    <div className={styles.serviceMainWrapper}>
      <div className={styles.servicesDetailHead}>
        <h4>{t('team.user.services.title')}</h4>
        <div className={styles.servicesDetailHeadBtn}>
          <Button
            className={styles.saveBtn}
            size={'large'}
            onClick={handleSaveChanges}
          >
            {t('team.user.services.save.changes.button')}
          </Button>
        </div>
      </div>
      <div className={styles.servicesContent}>
        <div className={styles.servicesTitleHead}>
          <h5>{t('team.user.services.title')}</h5>
          <div className={styles.desc}>
            {t('team.user.services.choose.services.title')}
          </div>
        </div>
        {isLoading ? (
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d, i) => {
            if (i === 0) {
              return setCheckboxSkeleton('', i)
            } else {
              return setCheckboxSkeleton(styles.paddingLeft, i)
            }
          })
        ) : (
          <CheckboxTree
            titleRender={handleTitle}
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={serviceCategoriesData}
          />
        )}
      </div>
      <div className={styles.servicesDetailHeadMobileBtn}>
        <Button
          className={styles.saveBtn}
          size={'large'}
          onClick={handleSaveChanges}
        >
          {t('team.user.services.save.changes.button')}
        </Button>
      </div>
    </div>
  )
}

export default Service
