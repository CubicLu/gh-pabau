import React, { FC, useState, useEffect } from 'react'
import { Input } from 'antd'
import { TreeSelectCheckBox } from '@pabau/ui'
import { EditOutlined } from '@ant-design/icons'
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

const treeData = [
  {
    title: arrangeTitle('Seasonal Offers (8)'),
    key: 2,
    children: [
      {
        title: arrangeTitle('4 ml contour package', '1h 30min'),
        key: 2.1,
      },
      {
        title: arrangeTitle('2 ml contour', '1h'),
        key: 2.2,
      },
      {
        title: arrangeTitle('1 ml filler', '1h 25min'),
        key: 2.3,
      },
    ],
  },
  {
    title: arrangeTitle('Special Offers (12)'),
    key: 3,
    children: [
      {
        title: arrangeTitle('4 ml contour package', '1h 30min'),
        key: 3.1,
      },
    ],
  },
  {
    title: arrangeTitle('Face Services (23)'),
    key: 4,
    children: [
      {
        title: arrangeTitle('4 ml contour package', '1h 30min'),
        key: 4.1,
      },
    ],
  },
  {
    title: arrangeTitle('Body Services (23)'),
    key: 5,
    children: [
      {
        title: arrangeTitle('4 ml contour package', '1h 30min'),
        key: 5.1,
      },
    ],
  },
  {
    title: arrangeTitle('Hair Services (23)'),
    key: 6,
    children: [
      {
        title: arrangeTitle('4 ml contour package', '1h 30min'),
        key: 6.1,
      },
    ],
  },
]

interface SelectServiceProps {
  onChange?: (data) => void
  data?: number[]
}

export const SelectService: FC<SelectServiceProps> = ({ onChange, data }) => {
  const [servicesModal, toggleServicesModal] = useState(false)
  const [selectedServices, setSelectedServices] = useState([])
  const [totalService, setTotalService] = useState(0)

  const onSave = (data) => {
    toggleServicesModal((servicesModal) => !servicesModal)
    setSelectedServices(data)
    onChange?.(data)
  }

  useEffect(() => {
    let keys: string[] = []
    function countKeys(data) {
      keys = [...keys, ...data.map((el) => el.key)]
      for (const el of data) {
        if (el.children) {
          countKeys(el.children)
        }
      }
    }
    countKeys(treeData)
    if (keys.length > 0) {
      setTotalService(keys.length)
    }
    setSelectedServices(data)
  }, [data])

  return (
    <div className={styles.selectService}>
      <Input
        className="services-input"
        type="text"
        size="large"
        value={
          selectedServices.length === totalService
            ? 'All Services'
            : selectedServices.length > 0
            ? `${selectedServices.length} services`
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
      <TreeSelectCheckBox
        modalTitle="Select Services"
        data={treeData}
        visible={servicesModal}
        inputPlaceholder="Search Services"
        onClose={() => toggleServicesModal((servicesModal) => !servicesModal)}
        defaultExpandedAll={true}
        defaultChecked={selectedServices}
        modalWidth={800}
        onSave={(data) => onSave(data)}
      />
    </div>
  )
}

export default SelectService
