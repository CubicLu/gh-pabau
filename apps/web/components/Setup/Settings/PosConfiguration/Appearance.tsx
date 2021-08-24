import { Switch } from '@pabau/ui'
import React, { FC } from 'react'
import { useTranslationI18 } from '../../../../hooks/useTranslationI18'
import SettingsLayout from '../SettingsLayout'
import styles from './common.module.less'

interface P {
  appearanceObj: AppearancePosConfig
  handleChange: (key: string, obj: AppearancePosConfig) => void
}

const Appearance: FC<P> = ({
  appearanceObj: { featureList },
  handleChange,
}): JSX.Element => {
  const handleFeatureChange = (
    key: number,
    checked: boolean,
    e: MouseEvent
  ) => {
    const data = featureList
    data[key] = { ...data[key], checked: checked }
    handleChange('appearance', { featureList: data })
  }

  const RenderContent = (): JSX.Element => {
    return (
      <div className={styles.appearanceContainer}>
        {featureList?.map(({ key, value, checked }) => (
          <div
            className={styles.featureList}
            key={`appearance-feature-list-${key}`}
          >
            <p>{value}</p>
            <Switch
              checked={checked}
              onChange={(checked, e) =>
                handleFeatureChange(key - 1, checked, e)
              }
            />
          </div>
        ))}
      </div>
    )
  }
  const { t } = useTranslationI18()
  return (
    <SettingsLayout
      title={t('setup.settings.pos.configuration.tab.items.appearance')}
      description={t(
        'setup.settings.pos.configuration.tab.appearance.description'
      )}
    >
      <RenderContent />
    </SettingsLayout>
  )
}

export default Appearance
