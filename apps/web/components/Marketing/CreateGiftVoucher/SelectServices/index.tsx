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
  key: string | number
  children?: SingleCheckBoxDropDown[]
}

interface SelectServiceProps {
  dataSource: SingleCheckBoxDropDown[]
  onChange?: (data) => void
  data?: number[]
}

export const SelectService: FC<SelectServiceProps> = ({
  dataSource,
  onChange,
  data,
}) => {
  const [servicesModal, toggleServicesModal] = useState(false)
  const [selectedServices, setSelectedServices] = useState([])
  const [totalService, setTotalService] = useState(0)
  const [treeData, setTreeData] = useState<SingleCheckBoxDropDown[]>([])
  const { t } = useTranslationI18()

  const onSave = () => {
    toggleServicesModal((servicesModal) => !servicesModal)
    const keys = [...selectedServices]
    if (selectedServices.includes('all')) {
      const index = keys.indexOf('all')
      keys.splice(index, 1)
    }
    onChange?.(keys)
  }

  useEffect(() => {
    const firsObj: SingleCheckBoxDropDown = {
      title: arrangeTitle(t('giftvouchers.create.label.selectall').toString()),
      key: 'all',
      children: dataSource,
    }
    setTreeData([firsObj])

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
    setSelectedServices(data)
  }, [data, dataSource, t])

  const onCheck = (checkedKeysValue: string[]) => {
    setSelectedServices(checkedKeysValue)
  }

  return (
    <div className={styles.selectService}>
      <Input
        className="services-input"
        type="text"
        size="large"
        value={
          selectedServices.length === totalService
            ? t('giftvouchers.create.label.allservice').toString()
            : selectedServices.length > 0
            ? `${selectedServices.length} ${t(
                'giftvouchers.create.label.countedservices'
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
        title={t('giftvouchers.create.label.selectservices')}
        className="servicesModal"
        width={800}
        onCancel={() => toggleServicesModal((modal) => !modal)}
      >
        <div className={styles.serviceInputSearch}>
          <Input
            type="text"
            size="large"
            placeholder={t('giftvouchers.create.label.searchservices')}
            suffix={<SearchOutlined />}
          />
        </div>
        <div className={styles.serviceInputSearch}>
          <CheckboxTree
            checkable
            defaultExpandAll={true}
            onCheck={onCheck}
            checkedKeys={selectedServices}
            treeData={treeData}
            showIcon={true}
            blockNode={true}
            showLine={false}
            switcherIcon={<DownOutlined />}
          />
        </div>
        <div className={styles.saveBtn}>
          <Button type="primary" size="large" onClick={onSave}>
            {t('giftvouchers.create.label.save')}{' '}
            {selectedServices?.length > 0
              ? selectedServices.includes('all')
                ? selectedServices.length - 1
                : selectedServices.length
              : ''}{' '}
            {t('giftvouchers.create.label.countedservices')}
          </Button>
        </div>
      </BasicModal>
    </div>
  )
}

export default SelectService
