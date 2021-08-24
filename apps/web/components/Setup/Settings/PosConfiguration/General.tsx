import { HelpTooltip, SimpleDropdown, Switch } from '@pabau/ui'
import React, { FC } from 'react'
import { useTranslationI18 } from '../../../../hooks/useTranslationI18'
import SettingsLayout from '../SettingsLayout'
import styles from './common.module.less'

interface P {
  generalObj: GeneralPosConfig
  handleChange: (key: string, obj: GeneralPosConfig) => void
}

const General: FC<P> = ({
  generalObj: { featureList, dropdownList },
  handleChange,
}) => {
  const handleSelect = (key: number, value): void => {
    const data = dropdownList
    data[key] = { ...data[key], value }
    handleChange('general', { featureList, dropdownList: data })
  }

  const handleFeatureChange = (key: number, checked: boolean): void => {
    const data = featureList
    data[key] = { ...data[key], checked }
    handleChange('general', { featureList: data, dropdownList })
  }

  const RenderContent = (): JSX.Element => {
    const { t } = useTranslationI18()
    return (
      <div className={styles.generalContainer}>
        {featureList?.map(({ key, value, checked }) => (
          <div
            key={`feature-block-${key}`}
            className={styles.generalContainerList}
          >
            <p>
              {value}
              <HelpTooltip
                helpText={t(
                  'setup.settings.pos.configuration.tab.general.tooltip'
                )}
                placement={'top'}
              />
            </p>
            <Switch
              checked={checked}
              onChange={(checked) => handleFeatureChange(key - 1, checked)}
            />
          </div>
        ))}

        {dropdownList?.map(({ key, label, value, options, helpText }) => (
          <div
            key={`general-dropdown-list-${key}`}
            className={styles.generalDropdownList}
          >
            <SimpleDropdown
              label={label}
              tooltip={helpText}
              value={value}
              dropdownItems={options}
              onSelected={(val) => handleSelect(key - 1, val)}
            />
          </div>
        ))}
      </div>
    )
  }
  const { t } = useTranslationI18()
  return (
    <SettingsLayout
      title={t('setup.settings.pos.configuration.tab.items.general')}
      description={t(
        'setup.settings.pos.configuration.tab.general.description'
      )}
    >
      <RenderContent />
    </SettingsLayout>
  )
}

export default General
