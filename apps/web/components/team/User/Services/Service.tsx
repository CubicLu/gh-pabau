import React, { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button, CheckboxTree, Notification, NotificationType } from '@pabau/ui'
import styles from './Service.module.less'
import {
  useGetServiceCategoriesQuery,
  useGetStaffServicesQuery,
} from '@pabau/graphql'
import { serviceData } from '../../../../mocks/UserDetail'

const Service: FC = () => {
  const [expandedKeys, setExpandedKeys] = useState(['Accent prime'])
  const [checkedKeys, setCheckedKeys] = useState([98532])
  const router = useRouter()
  const userId = Number(router.query['id'])
  const [serviceCategoriesData, setServiceCategoriesData] = useState([])
  const {
    data: serviceCategoryData,
    loading: serviceCategoryLoading,
  } = useGetServiceCategoriesQuery()
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
    if (serviceCategoryData?.ServiceCategories) {
      // setServiceCategoriesData()
      const response = serviceCategoryData?.ServiceCategories
      for (const d of response) {
        const subObj = {
          title: d.name,
          key: d.id,
          count: d._count?.CompanyService ?? 0,
        }
        if (d.Servicies.length > 0) {
          subObj['children'] = []
          for (const val of d.Servicies) {
            subObj['children'].push({
              title: val.name,
              key: val.id,
            })
          }
        }
        obj[0].children.push(subObj)
      }
      setServiceCategoriesData(obj)
    }
  }, [serviceCategoryData, serviceCategoryLoading])
  useEffect(() => {
    const staffServiceIds = []
    if (staffServiceData?.getStaffServices) {
      for (const d of staffServiceData?.getStaffServices) {
        staffServiceIds.push(d.id)
      }
    }
    setCheckedKeys(staffServiceIds)
  }, [staffServiceData, staffServiceLoading])
  const [autoExpandParent, setAutoExpandParent] = useState(true)

  const onExpand = (expandedKeysValue: string[]) => {
    setExpandedKeys(expandedKeysValue)
    setAutoExpandParent(false)
  }

  const onCheck = (checkedKeysValue: number[]) => {
    setCheckedKeys(checkedKeysValue)
  }

  const handleSaveChanges = () => {
    Notification(NotificationType.success, 'Success! Saved changes.')
  }
  const handleTitle = (d) => {
    if (d.count > 0) {
      return (
        <div className={styles.titleCountWrapper}>
          <div>{d.title}</div>
          <div className={styles.countWrapper}>
            <div className={styles.countContainer}>{d.count}</div>
          </div>
        </div>
      )
    } else {
      return (
        <div className={styles.titleCountWrapper}>
          <div>{d.title}</div>
        </div>
      )
    }
  }
  return (
    <div className={styles.serviceMainWrapper}>
      <div className={styles.servicesDetailHead}>
        <h4>Services</h4>
        <div className={styles.servicesDetailHeadBtn}>
          <Button
            className={styles.saveBtn}
            size={'large'}
            onClick={handleSaveChanges}
          >
            Save changes
          </Button>
        </div>
      </div>
      <div className={styles.servicesContent}>
        <div className={styles.servicesTitleHead}>
          <h5>Services</h5>
          <div className={styles.desc}>
            Choose the services this employee can perform
          </div>
        </div>
        <CheckboxTree
          titleRender={handleTitle}
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          treeData={serviceCategoriesData ?? serviceData}
        />
      </div>
      <div className={styles.servicesDetailHeadMobileBtn}>
        <Button
          className={styles.saveBtn}
          size={'large'}
          onClick={handleSaveChanges}
        >
          Save changes
        </Button>
      </div>
    </div>
  )
}

export default Service
