import React, { FC, ReactNode, useState } from 'react'
import { Button, Menu, Dropdown, Typography, Input, Drawer } from 'antd'
import { LeftOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons'
import styles from './DropdownOptionsTree.module.less'
import { useMedia } from 'react-use'
import classNames from 'classnames'

interface DropdownOption {
  key: string | number
  title: string
  subtitle?: string
  icon?: ReactNode
  childrens?: DropdownOption[]
  childrenCount?: number
  price?: string | number
}

interface P {
  btnContent: ReactNode
  mobileBtnContent: ReactNode
  dropDownTitle: string
  options: DropdownOption[]
  onItemSelect: (e) => void
}

export const DropdownOptionsTree: FC<P> = ({
  btnContent,
  mobileBtnContent,
  dropDownTitle,
  options,
  onItemSelect,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<DropdownOption[]>(
    options
  )
  const [showDrawer, setShowDrawer] = useState(false)
  const isMobile = useMedia('(max-width: 768px)', false)

  const { Title, Text } = Typography
  const { Search } = Input

  const selectItem = (item) => {
    if (item.childrens) {
      setSelectedOptions(item.childrens)
    } else {
      setShowDrawer(false)
      onItemSelect(item)
    }
  }

  const getParentOptions = (arr, q, p = false) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].key === q) return p
      if (arr[i].childrens) {
        for (let j = 0; j < arr[i].childrens.length; j++) {
          return getParentOptions(arr[i].childrens, q, arr)
        }
      }
    }
  }

  const backOptions = () => {
    setSelectedOptions(getParentOptions(options, selectedOptions[0].key))
  }

  const searchItems = (arr, q) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].key.toLowerCase().search(q.toLowerCase()) !== -1) return arr
      if (arr[i].childrens) {
        for (let j = 0; j < arr[i].childrens.length; j++) {
          return searchItems(arr[i].childrens, q)
        }
      }
    }
  }

  const onSearchOptions = (val) => {
    const searchedItems = searchItems(options, val)
    setSelectedOptions(searchedItems ? searchedItems : options)
  }

  const optionMenuContent = () => {
    return (
      <>
        <div className={styles.treeHeader}>
          {selectedOptions[0].key !== options[0].key && (
            <div className={styles.leftIcon} onClick={backOptions}>
              <LeftOutlined />
            </div>
          )}
          <Title level={5}>{dropDownTitle}</Title>
        </div>
        <div className={styles.treeSearchContainer}>
          <Search
            placeholder="Scan barcode or search any item"
            suffix={<SearchOutlined />}
            onSearch={(value) => onSearchOptions(value)}
            enterButton={false}
            allowClear={true}
          />
        </div>
        <div className={styles.treeContainer}>
          {selectedOptions.map((item) => {
            const { icon } = item
            return (
              <div
                key={item.key}
                className={styles.treeItem}
                onClick={() => selectItem(item)}
              >
                {icon && (
                  <div className={styles.leftIcon}>
                    <div className={styles.leftIconCont}>{icon}</div>
                  </div>
                )}
                <div className={styles.name}>
                  <Text strong>{`${item.title} ${
                    item.childrenCount ? `(${item.childrenCount})` : ''
                  }`}</Text>
                  {item?.subtitle && <span>{item.subtitle}</span>}
                </div>
                {item['childrens'] && item['childrens'].length > 0 && (
                  <div className={styles.rightContainer}>
                    <RightOutlined />
                  </div>
                )}
                {item['price'] && (
                  <div
                    className={classNames(
                      styles.rightContainer,
                      styles.rightPriceContainer
                    )}
                  >
                    <span>{item.price}</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </>
    )
  }

  const optionsMenu = (
    <Menu className={styles.dropdownOptionsTreeContainer}>
      {optionMenuContent()}
    </Menu>
  )

  if (isMobile) {
    return (
      <>
        <Drawer
          title="Basic Drawer"
          placement={'bottom'}
          closable={true}
          onClose={() => setShowDrawer(false)}
          visible={showDrawer}
          key={'bottom'}
          height={400}
          headerStyle={{ display: 'none' }}
          className={styles.dropdownOptionTreeMobileDrawer}
        >
          <div className={styles.dropdownOptionsTreeContainer}>
            {optionMenuContent()}
          </div>
        </Drawer>
        <Button
          type="primary"
          onClick={() => setShowDrawer(true)}
          size="small"
          style={{
            paddingLeft: 6,
            paddingRight: 6,
          }}
        >
          {mobileBtnContent}
        </Button>
      </>
    )
  } else {
    return (
      <Dropdown overlay={optionsMenu} trigger={['click']}>
        <Button type="primary">{btnContent}</Button>
      </Dropdown>
    )
  }
}

export default DropdownOptionsTree
