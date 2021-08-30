import { CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { Image, Popover } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { ReactComponent as CircleCheck } from '../../assets/images/circle-check.svg'
import ARSVG from '../../assets/images/lang-logos/arabic.svg'
import BRSVG from '../../assets/images/lang-logos/bulgarian.svg'
import CZSVG from '../../assets/images/lang-logos/czech.svg'
import DASVG from '../../assets/images/lang-logos/dutch.svg'
import ENSVG from '../../assets/images/lang-logos/en.svg'
import FRSVG from '../../assets/images/lang-logos/french.svg'
import HGSVG from '../../assets/images/lang-logos/hungarian.svg'
import LTSVG from '../../assets/images/lang-logos/latvian.svg'
import NWSVG from '../../assets/images/lang-logos/norwegian.svg'
import POSVG from '../../assets/images/lang-logos/polish.svg'
import ROMSVG from '../../assets/images/lang-logos/romanian.svg'
import RUSSVG from '../../assets/images/lang-logos/russian.svg'
import SPSVG from '../../assets/images/lang-logos/spanish.svg'
import SWSVG from '../../assets/images/lang-logos/swedish.svg'
import styles from './ClientLanguage.module.less'

export const languageMenu: LangData[] = [
  {
    label: 'English',
    shortLabel: 'EN',
    logo: ENSVG,
    selected: true,
    default: true,
  },
  {
    label: 'French',
    shortLabel: 'FR',
    logo: FRSVG,
    selected: false,
    default: false,
  },
  {
    label: 'Spanish',
    shortLabel: 'ES',
    logo: SPSVG,
    selected: false,
    default: false,
  },
  {
    label: 'Arabic',
    shortLabel: 'AR',
    logo: ARSVG,
    selected: false,
    default: false,
  },
  {
    label: 'Bulgarian',
    shortLabel: 'BG',
    logo: BRSVG,
    selected: false,
    default: false,
  },
  {
    label: 'Czech',
    shortLabel: 'CS',
    logo: CZSVG,
    selected: false,
    default: false,
  },
  {
    label: 'Danish',
    shortLabel: 'DA',
    logo: DASVG,
    selected: false,
    default: false,
  },
  {
    label: 'Hungarian',
    shortLabel: 'HU',
    logo: HGSVG,
    selected: false,
    default: false,
  },
  {
    label: 'Latvian',
    shortLabel: 'LV',
    logo: LTSVG,
    selected: false,
    default: false,
  },
  {
    label: 'Norwegian',
    shortLabel: 'NO',
    logo: NWSVG,
    selected: false,
    default: false,
  },
  {
    label: 'Polish',
    shortLabel: 'PL',
    logo: POSVG,
    selected: false,
    default: false,
  },
  {
    label: 'Swedish',
    shortLabel: 'SW',
    logo: SWSVG,
    selected: false,
    default: false,
  },
  {
    label: 'Romanian',
    shortLabel: 'RO',
    logo: ROMSVG,
    selected: false,
    default: false,
  },
  {
    label: 'Russian',
    shortLabel: 'RU',
    logo: RUSSVG,
    selected: false,
    default: false,
  },
]

interface LangData {
  label: string
  shortLabel: string
  logo: string
  selected?: boolean
  default: boolean
}

interface P {
  childHook: [LangData[], React.Dispatch<React.SetStateAction<LangData[]>>]
}

const LanguagePop: FC<P> = ({
  childHook: [preferredLang, setPreferredLang],
}) => {
  const onClickLang = (index) => {
    const preferredLangTemp = [...preferredLang]
    if (
      !preferredLangTemp.find(
        (item) => item.shortLabel === languageMenu[index].shortLabel
      )
    ) {
      // if (preferredLangTemp.length < 4) {
      languageMenu[index].selected = true
      preferredLangTemp.push({ ...languageMenu[index] })
      // } else {
      // preferredLangTemp.pop()
      // preferredLangTemp.push({ ...languageMenu[index] })
      // }
    }
    setPreferredLang([...preferredLangTemp])
  }
  return (
    <div className={styles.languagePop}>
      <span className={styles.popHeader}>Select language</span>
      {languageMenu.map((item, index) => (
        <div
          key={item.shortLabel}
          className={styles.languageItem}
          onClick={() => onClickLang(index)}
        >
          <div className={styles.languageLeft}>
            <Image
              src={item.logo}
              width={16}
              alt={item.label}
              preview={false}
            />
            <span
              className={
                preferredLang.some((e) => e.shortLabel === item.shortLabel)
                  ? styles.languageNameSelected
                  : styles.languageName
              }
            >
              {item.label}
            </span>
          </div>
          {preferredLang.some((e) => e.shortLabel === item.shortLabel) && (
            <CircleCheck />
          )}
        </div>
      ))}
    </div>
  )
}

interface ClientLanguageProps {
  selectLanguageHook: [string, React.Dispatch<React.SetStateAction<string>>]
  defaultLanguage: string
  isClickable: boolean
  isHover: boolean
  addButton?: React.ReactNode
  onChangeLanguage?: (e) => void
  showPreferredLng?: boolean
}

const defaultLan = (defaultLanguage: string): LangData => {
  let result = defaultLanguage
    ? languageMenu.find((item) => defaultLanguage === item.shortLabel)
    : null
  if (!result) {
    result = languageMenu.find((item) => item.default === true) as LangData
  }
  return result
}

function isDefault(item: LangData, defaultLanguage: string): boolean {
  if (defaultLanguage) {
    return item.shortLabel === defaultLanguage
  }
  return item.default
}

export const ClientLanguage: FC<ClientLanguageProps> = ({
  selectLanguageHook: [selectLanguage, setSelectLanguage],
  defaultLanguage,
  isClickable,
  isHover,
  addButton,
  onChangeLanguage,
  showPreferredLng = true,
}) => {
  const [preferredLang, setPreferredLang] = useState<LangData[]>([])

  // useEffect(() => {
  //   const defLang = languageMenu.find((item) => defaultLanguage ? item.shortLabel === defaultLanguage : item.selected === true)
  //   if (defLang !== undefined) {
  //     setPreferredLang([defLang])
  //   }
  // }, [])

  const updatePreferredLang = (e) => {
    setPreferredLang(e)
    if (typeof onChangeLanguage !== 'undefined') {
      onChangeLanguage(e)
    }
  }

  const deletePreferredLang = (index) => {
    // if (preferredLang[index].selected === false || preferredLang[index].selected === undefined) {
    // 	preferredLang.splice(index, 1)
    // 	setPreferredLang([...preferredLang])
    // }
    preferredLang[index].selected = false

    preferredLang.splice(index, 1)
    setPreferredLang([...preferredLang])
    if (typeof onChangeLanguage !== 'undefined') {
      onChangeLanguage([...preferredLang])
    }
  }

  const [flagStatus, setFlagStatus] = useState(false)

  useEffect(() => {
    setPreferredLang([defaultLan(defaultLanguage)])
    if (typeof onChangeLanguage !== 'undefined') {
      onChangeLanguage([defaultLan(defaultLanguage)])
    }
  }, [defaultLanguage, onChangeLanguage])

  function checkEvent1(value) {
    if (isHover) {
      setFlagStatus(true)
      setSelectLanguage(value)
    }
  }
  function checkEvent2(value) {
    if (isClickable) {
      setFlagStatus(true)
      setSelectLanguage(value)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.languageWrap}>
        {showPreferredLng &&
          preferredLang?.map((item, index) => {
            return (
              <div
                key={item.label}
                className={`${
                  flagStatus && item.shortLabel === selectLanguage
                    ? styles.preferredLanguage
                    : styles.preferredLanguageOut
                } ${
                  isHover && item.shortLabel === selectLanguage
                    ? styles.preferredLanguageMouseIn
                    : styles.preferredLanguageMouseOut
                }`}
                onMouseEnter={() => checkEvent1(item.shortLabel)}
                onClick={() => checkEvent2(item.shortLabel)}
                onMouseOver={() => setFlagStatus(true)}
                onMouseLeave={() => setFlagStatus(true)}
              >
                <Image
                  key={item.label}
                  preview={false}
                  width={26}
                  src={item.logo}
                  alt={item.label}
                />
                <span className={styles.languageName}>{item.shortLabel}</span>
                {!isDefault(item, defaultLanguage) && (
                  <CloseOutlined
                    className={styles.closeBadge}
                    onClick={() => deletePreferredLang(index)}
                  />
                )}
              </div>
            )
          })}
      </div>
      <div className={styles.addpopover}>
        <Popover
          content={
            <LanguagePop childHook={[preferredLang, updatePreferredLang]} />
          }
          placement="topLeft"
          trigger="click"
        >
          {addButton ? (
            addButton
          ) : (
            <>
              <div className={styles.addLanguageBtn}>
                <PlusOutlined className={styles.popButton} />
              </div>
              <span className={styles.addLanguageText}>Add language</span>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default ClientLanguage
