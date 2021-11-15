import React, { FC, useState, useEffect } from 'react'
import { Button, Input } from 'antd'
import { BasicModal, CheckboxTree } from '@pabau/ui'
import { useTranslationI18 } from '../../../../hooks/useTranslationI18'
import { DownOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import styles from './index.module.less'

const arrangeTitle = (
  title: string | number | JSX.Element = '',
  subTitle: string | number | JSX.Element = ''
) => {
  return (
    <span className="title">
      <span className="main">{title}</span>
      {subTitle && (
        <span className="sub" style={{ marginTop: '2.5px' }}>
          {subTitle}
        </span>
      )}
    </span>
  )
}
export interface SingleCheckBoxDropDown {
  title: string | number | JSX.Element
  label?: string | number | JSX.Element
  key: string | number
  children?: SingleCheckBoxDropDown[]
}

interface SelectServiceProps {
  dataSource: SingleCheckBoxDropDown[]
  onChange?: (data) => void
  data?: number[] | string[]
}

export const SelectService: FC<SelectServiceProps> = ({
  dataSource,
  onChange,
  data,
}) => {
  const [servicesModal, toggleServicesModal] = useState(false)
  const [selectedServices, setSelectedServices] = useState(data)
  const [totalService, setTotalService] = useState(0)
  const [treeData, setTreeData] = useState<SingleCheckBoxDropDown[]>([])
  const [cTreeData, setCTreeData] = useState<SingleCheckBoxDropDown[]>([])
  const { t } = useTranslationI18()

  useEffect(() => {
    const updatedTreeData = (data) => {
      return data?.map((el) => {
        if (
          el?.label &&
          (typeof el?.title === 'string' || typeof el?.title === 'number')
        )
          el.title = arrangeTitle(el.title, el?.label)
        if (el?.children) updatedTreeData(el?.children)
        return el
      })
    }
    const data = updatedTreeData(dataSource)
    const finalTreeData: SingleCheckBoxDropDown = {
      title: t('selectservices.label.selectall').toString(),
      key: 'all',
      children: data,
    }
    setTreeData([finalTreeData])
    setCTreeData([finalTreeData])

    let keys: string[] = []
    function countKeys(data) {
      keys = [...keys, ...data.map((el) => el.key)]
      for (const el of data) {
        if (el.children) {
          countKeys(el.children)
        }
      }
    }
    countKeys(dataSource)
    if (keys.length > 0) {
      setTotalService(keys.length)
    }
  }, [dataSource, t])

  const onSave = () => {
    toggleServicesModal((servicesModal) => !servicesModal)
    const keys = [...selectedServices]
    onChange?.(keys)
  }

  const onCheck = (checkedKeysValue: string[]) => {
    console.log('C:', checkedKeysValue)
    if ((checkedKeysValue as string[]).includes('all')) {
      const index = checkedKeysValue.indexOf('all')
      checkedKeysValue.splice(index, 1)
    }
    setSelectedServices(checkedKeysValue)
  }

  const onSearch = (value) => {
    if (value) {
      const search = (data) => {
        return data.filter((el) => {
          if (
            el?.title
              ?.toString()
              ?.toLowerCase()
              ?.includes(value?.toLowerCase()) ||
            el?.label?.toString()?.toLowerCase()?.includes(value?.toLowerCase())
          ) {
            return el
          }
          return null
        })
      }
      const results = search(dataSource)
      setTreeData(results)
    } else {
      setTreeData(cTreeData)
    }
  }

  return (
    <div className={styles.selectService}>
      <Input
        className="services-input"
        type="text"
        size="large"
        value={
          selectedServices.length === totalService
            ? t('selectservices.label.allservice').toString()
            : selectedServices.length > 0
            ? `${selectedServices.length} ${t(
                'selectservices.label.countedservices'
              )}`
            : null
        }
        disabled={true}
        suffix={
          <EditOutlined
            color="#ecedf0"
            onClick={() =>
              toggleServicesModal((servicesModal) => !servicesModal)
            }
          />
        }
        placeholder="Services"
      />
      <BasicModal
        visible={servicesModal}
        title={t('selectservices.label.selectservices')}
        className="servicesModal"
        width={800}
        onCancel={() => toggleServicesModal((modal) => !modal)}
      >
        <div className={styles.serviceInputSearch}>
          <Input
            type="text"
            size="large"
            placeholder={t('selectservices.label.searchservices')}
            suffix={<SearchOutlined />}
            onChange={(e) => onSearch(e?.target?.value)}
          />
        </div>
        <div className={styles.serviceInputSearch}>
          <CheckboxTree
            checkable
            defaultExpandAll={true}
            onCheck={onCheck}
            checkedKeys={selectedServices as string[]}
            treeData={treeData}
            showIcon={true}
            blockNode={true}
            showLine={false}
            switcherIcon={<DownOutlined />}
          />
        </div>
        <div className={styles.saveBtn}>
          <Button type="primary" size="large" onClick={onSave}>
            {t('common-label-save')}{' '}
            {selectedServices?.length > 0
              ? (selectedServices as string[]).includes('all')
                ? selectedServices.length - 1
                : selectedServices.length
              : ''}{' '}
            {t('selectservices.label.countedservices')}
          </Button>
        </div>
      </BasicModal>
    </div>
  )
}

export default SelectService
