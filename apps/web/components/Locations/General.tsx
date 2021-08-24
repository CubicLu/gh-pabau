import React, { FC } from 'react'
import { InitialLocationProps } from './LocationsLayout'
import styles from './LocationsLayout.module.less'
import { Form as AntForm, Input, Switch } from 'formik-antd'
import { PhoneNumberInput } from '@pabau/ui'
import { useTranslationI18 } from '../../hooks/useTranslationI18'

interface GeneralProps {
  values?: InitialLocationProps
  setFieldValue(
    field: keyof InitialLocationProps,
    values: string | string[] | boolean | number
  ): void
}

export const General: FC<GeneralProps> = ({ setFieldValue, values }) => {
  const { t } = useTranslationI18()
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.contentBox}>
        <h2 style={{ marginBottom: 20 }}>
          {t('setup.locations.submenu.general')}
        </h2>
        <div className={styles.generalForm}>
          <AntForm
            layout={'vertical'}
            requiredMark={false}
            className={styles.generalForm}
          >
            <AntForm.Item
              label={t('setup.locations.general.location.name')}
              name={'name'}
            >
              <Input
                name={'name'}
                placeholder={t(
                  'setup.locations.general.location.name.placeholder'
                )}
              />
            </AntForm.Item>
            <AntForm.Item name={t('setup.locations.general.location.phone')}>
              <PhoneNumberInput
                labelStyle={styles.phoneInputLabel}
                label={t('setup.locations.general.location.phone')}
                value={values.phone}
                onChange={(value) => setFieldValue('phone', value)}
              />
            </AntForm.Item>
            <AntForm.Item
              label={t('setup.locations.general.location.email')}
              name={'email'}
            >
              <Input
                name={'email'}
                placeholder={t(
                  'setup.locations.general.location.email.placeholder'
                )}
              />
            </AntForm.Item>
            <AntForm.Item
              label={t('setup.locations.general.location.website')}
              name={'website'}
            >
              <Input
                name={'website'}
                placeholder={t(
                  'setup.locations.general.location.website.placeholder:'
                )}
              />
            </AntForm.Item>
            <div className={styles.switchContainer}>
              <AntForm.Item name="hasCalender">
                <div className={styles.switchBox}>
                  <Switch name="hasCalender" />
                  <p>
                    {t(
                      'setup.locations.general.location.appointment.bookings.text'
                    )}
                  </p>
                </div>
              </AntForm.Item>
              <AntForm.Item name="bookable">
                <div className={styles.switchBox}>
                  <Switch name="bookable" />
                  <p>
                    {t('setup.locations.general.location.online.bookings.text')}
                  </p>
                </div>
              </AntForm.Item>
              <AntForm.Item name="showOnline">
                <div className={styles.switchBox}>
                  <Switch name="showOnline" />
                  <p>
                    {t('setup.locations.general.location.show.online.text')}
                  </p>
                </div>
              </AntForm.Item>
            </div>
          </AntForm>
        </div>
      </div>
    </div>
  )
}

export default General
