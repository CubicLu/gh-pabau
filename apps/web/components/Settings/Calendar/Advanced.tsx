import { HelpTooltip } from '@pabau/ui'
import { Checkbox, Typography, Form, InputNumber } from 'antd'
import React, { FC } from 'react'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import AdvancedSkeleton from './AdvancedSkeleton'
import styles from './Calendar.module.less'

const { Title } = Typography
interface AdvancedControlItems {
  type: string
  value: boolean
  help: string
  key: number
  name: string
}

interface CompanyMeta {
  id: number
  meta_name: string
  meta_value: string
}

interface P {
  initials?: boolean
  noshow_count?: number
  column_total?: boolean
  companyMetas?: CompanyMeta[]
  onChange?: (data) => void
  onMetaChange?: (data: CompanyMeta[], updatedMeta: CompanyMeta) => void
  isLoading?: boolean
}

export const Advanced: FC<P> = ({
  initials,
  noshow_count,
  column_total,
  companyMetas,
  onChange,
  onMetaChange,
  isLoading = true,
  ...props
}) => {
  const { t } = useTranslationI18()
  const [form] = Form.useForm()

  const getMetaCheckValue = (name) => {
    const metaData = companyMetas.find((el) => el.meta_name === name)
    return metaData?.meta_value
      ? metaData?.meta_value === '1' || Number(metaData?.meta_value) === 1
        ? true
        : false
      : false
  }

  const advancedControls: AdvancedControlItems[] = [
    {
      name: 'meta.auto_appointment_invoice',
      type: t('settings.calendar.advanced.input.raiseinvoice.label'),
      value: getMetaCheckValue('auto_appointment_invoice'),
      help: t('settings.calendar.advanced.input.raiseinvoice.tooltip'),
      key: 1,
    },
    {
      name: 'meta.advanced_calendar_lockout',
      type: t('settings.calendar.advanced.input.calendarlockout.label'),
      value: getMetaCheckValue('advanced_calendar_lockout'),
      help: t('settings.calendar.advanced.input.calendarlockout.tooltip'),
      key: 2,
    },
    {
      name: 'meta.auto_complete_appt_status',
      type: t('settings.calendar.advanced.input.autocomplete.label'),
      value: getMetaCheckValue('auto_complete_appt_status'),
      help: t('settings.calendar.advanced.input.autocomplete.tooltip'),
      key: 5,
    },
    {
      name: 'meta.hide_client_name_appointment_notification',
      type: t('settings.calendar.advanced.input.hideclientname.label'),
      value: getMetaCheckValue('hide_client_name_appointment_notification'),
      help: t('settings.calendar.advanced.input.hideclientname.tooltip'),
      key: 7,
    },
    {
      name: 'meta.allow_service_no_price',
      type: t('settings.calendar.advanced.input.allowservice.label'),
      value: getMetaCheckValue('allow_service_no_price'),
      help: t('settings.calendar.advanced.input.allowservice.tooltip'),
      key: 8,
    },
    {
      name: 'column_total',
      type: t('settings.calendar.advanced.input.hideshowaccounts.label'),
      value: column_total,
      help: t('settings.calendar.advanced.input.hideshowaccounts.tooltip'),
      key: 9,
    },
    {
      name: 'meta.cal_enable_group_locations',
      type: t('settings.calendar.advanced.input.groupcolumnlocation.label'),
      value: getMetaCheckValue('cal_enable_group_locations'),
      help: t('settings.calendar.advanced.input.groupcolumnlocation.tooltip'),
      key: 10,
    },
    {
      name: 'initials',
      type: t('settings.calendar.advanced.input.initials.label'),
      value: initials,
      help: t('settings.calendar.advanced.input.initials.tooltip'),
      key: 11,
    },
  ]

  return isLoading ? (
    <AdvancedSkeleton />
  ) : (
    <div className={styles.calendarSettingsAdvanced}>
      <div className={styles.settingContent}>
        <Title className={styles.headerText}>
          {t('settings.calendar.advanced.title')}
        </Title>
        {/* <span className={styles.hideSection}> */}
        <span className={`${styles.description}`}>
          {t('settings.calendar.advanced.subtitle')}
        </span>
        {/* </span> */}
      </div>
      <div className={styles.advancedControls}>
        {advancedControls.map((advanced) => {
          return (
            <div key={advanced.key} className={styles.advancedCheckList}>
              <Checkbox
                key={advanced.key}
                checked={advanced.value}
                defaultChecked={advanced.value}
                className={styles.advancedCheck}
                onChange={(val) => {
                  if (advanced?.name) {
                    if (advanced.name.includes('meta.')) {
                      const metas = [...companyMetas]
                      const name = advanced.name.split('.')[1]
                      const meta = metas.find((el) => el.meta_name === name)
                      const metaIndex = metas.findIndex(
                        (el) => el.meta_name === name
                      )
                      const checked = val.target.checked ? '1' : '0'
                      const updatedMeta = {
                        id: meta?.id,
                        meta_name: name,
                        meta_value: checked,
                      }
                      metas.splice(metaIndex, 1, updatedMeta)
                      onMetaChange(metas, updatedMeta)
                    } else {
                      onChange?.({
                        [`${advanced.name}`]: val.target.checked ? 1 : 0,
                      })
                    }
                  }
                }}
              >
                <span className={styles.appointmentText}>{advanced.type}</span>
              </Checkbox>
              <HelpTooltip helpText={advanced.help} />
            </div>
          )
        })}
        <div className={styles.numberInput}>
          <div className={styles.numberInputLabel}>
            <span>
              {t('settings.calendar.advanced.input.noshowcount.label')}
            </span>
            <HelpTooltip
              helpText={t(
                'settings.calendar.advanced.input.noshowcount.tooltip'
              )}
            />
          </div>
          <div>
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                noshow_count: noshow_count,
              }}
            >
              <Form.Item
                name="noshow_count"
                rules={[
                  {
                    type: 'number',
                    min: 0,
                    message: t(
                      'settings.calendar.advanced.input.noshowcount.err1'
                    ),
                  },
                ]}
              >
                <InputNumber
                  type="number"
                  value={Number(noshow_count)}
                  placeholder={t(
                    'settings.calendar.advanced.input.noshowcount.label'
                  )}
                  onChange={(value) => {
                    onChange?.({
                      noshow_count: Number(value),
                    })
                  }}
                />
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Advanced
