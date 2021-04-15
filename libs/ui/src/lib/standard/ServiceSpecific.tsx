import React, { FC, useEffect, useState } from 'react'
import styles from './Standard.module.less'
import { Image, Popover, Select } from 'antd'
import { CloseOutlined, PlusOutlined } from '@ant-design/icons'
import botoxTreatment from '../../assets/images/botoxTreatment.jpg'
import { useTranslation } from 'react-i18next'

const { Option, OptGroup } = Select
interface P {
  selectServiceHook: [string, React.Dispatch<React.SetStateAction<string>>]
  defaultService: string
  isClickable: boolean
  isHover?: boolean
  selectLanguage?: string
}
interface PopupProps {
  childHook: [Service, React.Dispatch<React.SetStateAction<Service>>]
  selectLanguage?: string
}
const services = [
  {
    groupTitle: 'Hair',
    groupItems: [
      {
        id: 1,
        name: 'Japanese straightening',
        value: 'japaneseStraightening',
        logo: botoxTreatment,
      },
      {
        id: 2,
        name: 'Haircuts and hairdressing',
        value: 'Haircuts and hairdressing',
        logo: botoxTreatment,
      },
      {
        id: 3,
        name: 'Hair transplants',
        value: 'Hair transplants',
        logo: botoxTreatment,
      },
    ],
  },
]

const ServicePopover: FC<PopupProps> = ({
  childHook: [preferredService, setPreferredService],
  selectLanguage,
}) => {
  const handleServiceChange = (value) => {
    const selectedServices: LangData[] = []
    for (const service of services) {
      for (const group of service.groupItems) {
        if (value.includes(group.name)) {
          selectedServices.push(group)
        }
      }
    }
    if (selectLanguage) {
      setPreferredService((prevState) => ({
        ...prevState,
        [selectLanguage]: selectedServices,
      }))
    }
  }

  return (
    <div>
      <span className={styles.labelText}>Select Service</span>
      <Select
        showSearch
        mode="multiple"
        onChange={handleServiceChange}
        value={
          selectLanguage &&
          preferredService[selectLanguage] && [
            ...preferredService[selectLanguage].map((service) => service.name),
          ]
        }
        dropdownClassName={styles.servicePopup}
      >
        {services.map((item) => (
          <OptGroup
            label={
              <span
                style={{
                  color: 'var(--grey-text-color)',
                  fontSize: '14px',
                }}
              >
                {item?.groupTitle}
              </span>
            }
            key={item?.groupTitle}
          >
            {item?.groupItems?.map((subItem) => (
              <Option key={subItem.name} value={subItem.name}>
                <Image
                  key={subItem.name}
                  preview={false}
                  src={subItem.logo}
                  alt={subItem.value}
                />
                {subItem.name}
              </Option>
            ))}
          </OptGroup>
        ))}
      </Select>
    </div>
  )
}

interface LangData {
  id: number
  name: string
  value: string
  logo: string
}

interface Service {
  [key: string]: LangData[]
}

function isDefault(item: LangData, defaultService: string): boolean {
  return defaultService ? item.name === defaultService : false
}

export const ServiceSpecific: FC<P> = ({
  selectServiceHook: [selectService, setSelectService],
  defaultService,
  isClickable,
  isHover,
  selectLanguage,
}) => {
  const [preferredService, setPreferredService] = useState({})
  const { t } = useTranslation('common')

  const deletePreferredService = (e, index) => {
    e.stopPropagation()

    if (selectLanguage && preferredService[selectLanguage]) {
      preferredService[selectLanguage].splice(index, 1)
    }

    if (selectLanguage) {
      setPreferredService((prevState) => ({
        ...prevState,
        [selectLanguage]: preferredService[selectLanguage],
      }))
    }
  }

  const defaultLan = (defaultService: string): LangData[] => {
    const defaultData: LangData[] = []
    for (const service of services) {
      for (const groupItem of service.groupItems) {
        if (groupItem.name === defaultService) {
          defaultData.push(groupItem)
        }
      }
    }
    return selectLanguage && preferredService[selectLanguage]?.length > 0
      ? preferredService[selectLanguage]
      : defaultData
  }

  useEffect(() => {
    if (defaultService) {
      const service = defaultLan(defaultService)
      if (service && selectLanguage) {
        setPreferredService((prevState) => ({
          ...prevState,
          [selectLanguage]: service,
        }))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectLanguage, defaultService])

  function checkEvent(value) {
    if (isHover) {
      setSelectService(value)
    }
    if (isClickable) {
      setSelectService(value)
    }
  }
  return (
    <div className={styles.specificService}>
      <div className={styles.container}>
        <div className={styles.serviceWrap}>
          <div className={styles.serviceTask}>
            {selectLanguage &&
              preferredService[selectLanguage] &&
              preferredService[selectLanguage]?.map((item, index) => {
                return (
                  <div
                    className={`${styles.serviceContent} ${
                      item.name === selectService && styles.activeService
                    }`}
                    key={item.id}
                    onClick={() => checkEvent(item.name)}
                  >
                    <Image
                      key={item.id}
                      preview={false}
                      width={26}
                      src={item.logo}
                      alt={item.value}
                    />
                    <span className={styles.languageName}>{item.name}</span>
                    {!isDefault(item, defaultService) &&
                      item.name !== selectService && (
                        <CloseOutlined
                          className={styles.closeBadge}
                          onClick={(e) => deletePreferredService(e, index)}
                        />
                      )}
                  </div>
                )
              })}
          </div>
        </div>
        <div className={styles.addPopover}>
          <Popover
            overlayClassName={styles.dropdownPop}
            content={
              <ServicePopover
                childHook={[preferredService, setPreferredService]}
                selectLanguage={selectLanguage}
              />
            }
            placement="topLeft"
            trigger="click"
          >
            <div className={styles.addLanguageBtn}>
              <PlusOutlined className={styles.popButton} />
            </div>
            <span className={styles.addLanguageText}>
              {t('notifications.serviceSpecific.addService')}
            </span>
          </Popover>
        </div>
      </div>
    </div>
  )
}
