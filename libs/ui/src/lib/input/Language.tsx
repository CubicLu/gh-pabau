import { Select } from 'antd'
import React, { FC } from 'react'
import { languageMenu } from '../../assets/images/lang-logos'

interface LanguageProps {
  onSelect?: (val) => void
  defaultValue?: string
  useAbbreviation?: boolean
}

export const Language: FC<LanguageProps> = ({
  onSelect,
  defaultValue,
  useAbbreviation,
}) => {
  const { Option } = Select
  return (
    <Select defaultValue={defaultValue} onSelect={(val) => onSelect?.(val)}>
      {languageMenu.map((lang, index) => (
        <Option key={`lang-item-${index}`} value={lang.label}>
          <img
            alt={lang.label}
            src={lang.logo}
            style={{ width: '18px', marginBottom: '2px' }}
          />{' '}
          {useAbbreviation ? lang.shortLabel : lang.label}
        </Option>
      ))}
    </Select>
  )
}
export default Language
