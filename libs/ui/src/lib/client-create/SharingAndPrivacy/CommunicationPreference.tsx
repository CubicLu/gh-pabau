import React, { FC, useState } from 'react'
import { Form as AntForm, Radio } from 'formik-antd'
import { Tooltip, Button, Checkbox } from 'antd'
import styles from './SharingPrivacy.module.less'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { BasicModal, InitialDetailsProps } from '@pabau/ui'
import { useTranslation } from 'react-i18next'

interface P {
  setFieldValue(field: keyof InitialDetailsProps, values: string[]): void
  values?: InitialDetailsProps
}
const CommunicationPreference: FC<P> = ({ setFieldValue, values }) => {
  const { t } = useTranslation('common')
  const [openModal, setOpenModal] = useState(false)

  const handleChange = (e) => {
    const selected = values?.['marketingPromotion']
      ? [...values['marketingPromotion']]
      : []
    if (e.target.value === 'needToKnows' && !e.target.checked) {
      setOpenModal(true)
    } else {
      if (e.target.checked) {
        selected.push(e.target.value)
        setFieldValue('marketingPromotion', selected)
      } else {
        setFieldValue(
          'marketingPromotion',
          selected.filter((value) => value !== e.target.value)
        )
      }
    }
  }

  const handleTurnOff = () => {
    const selected = values?.['marketingPromotion'] ?? []
    setFieldValue(
      'marketingPromotion',
      selected.filter((value) => value !== 'needToKnows')
    )
    setOpenModal(false)
  }

  return (
    <div>
      <AntForm
        layout={'vertical'}
        requiredMark={false}
        className={styles.innerMainWrapper}
      >
        <h4>
          {t('create.client.modal.privacy.communication.preference.title')}
        </h4>
        <div className={styles.marketingWrapper}>
          <h6>
            {t(
              'create.client.modal.privacy.communication.marketing.promotion.title'
            )}
          </h6>
          <p>
            {t(
              'create.client.modal.privacy.communication.marketing.promotion.description'
            )}
          </p>
          <div className={styles.marketCheckbox}>
            <AntForm.Item name={'marketingPromotion'}>
              <Checkbox.Group
                name={'marketingPromotion'}
                options={[
                  {
                    label: t(
                      'create.client.modal.privacy.communication.marketing.promotion.sms.title'
                    ),
                    value: 'sms',
                    onChange: handleChange,
                  },
                  {
                    label: t(
                      'create.client.modal.privacy.communication.marketing.promotion.email.title'
                    ),
                    value: 'email',
                    onChange: handleChange,
                  },
                  {
                    label: t(
                      'create.client.modal.privacy.communication.marketing.promotion.phone.title'
                    ),
                    value: 'phone',
                    onChange: handleChange,
                  },
                  {
                    label: t(
                      'create.client.modal.privacy.communication.marketing.promotion.postal.title'
                    ),
                    value: 'postal',
                    onChange: handleChange,
                  },
                  {
                    label: (
                      <span className={styles.checkTitle}>
                        {t(
                          'create.client.modal.privacy.communication.marketing.promotion.subscription.receive.title'
                        )}
                        <Tooltip
                          title={t(
                            'create.client.modal.privacy.communication.marketing.promotion.subscription.receive.tooltip'
                          )}
                        >
                          <Button className={styles.btnIcon}>
                            <QuestionCircleOutlined />
                          </Button>
                        </Tooltip>
                      </span>
                    ),
                    value: 'needToKnows',
                    onChange: handleChange,
                  },
                ]}
                value={values?.['marketingPromotion']}
              />
            </AntForm.Item>
          </div>
        </div>
        <div className={styles.policyWrap}>
          <h6>{t('create.client.modal.privacy.privacy.policy.title')}</h6>
          <p>{t('create.client.modal.privacy.privacy.policy.label')}</p>
          <Radio.Group name={'privacyPolicy'}>
            {[
              {
                name: t('create.client.modal.privacy.policy.no.response.label'),
                value: '0',
              },
              {
                name: t('create.client.modal.privacy.policy.accepted.label'),
                value: '1',
              },
              {
                name: t('create.client.modal.privacy.policy.rejected.label'),
                value: '-1',
              },
            ].map((option) => (
              <Radio key={option.name} name={option.name} value={option.value}>
                {option.name}
              </Radio>
            ))}
          </Radio.Group>
        </div>
      </AntForm>
      <BasicModal
        visible={openModal}
        title={t(
          'create.client.modal.privacy.subscription.receive.alert.title'
        )}
        onCancel={() => setOpenModal(false)}
        className={styles.preferenceModal}
      >
        <p>
          {t(
            'create.client.modal.privacy.subscription.receive.alert.description'
          )}
        </p>
        <div className={styles.btnTurnOff}>
          <Button type="primary" danger size={'large'} onClick={handleTurnOff}>
            {t(
              'create.client.modal.privacy.subscription.receive.alert.button.title'
            )}
          </Button>
        </div>
      </BasicModal>
    </div>
  )
}

export default CommunicationPreference
