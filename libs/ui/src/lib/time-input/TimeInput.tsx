import React, { FC } from 'react'
import { TimePicker } from 'antd'
import { TimePickerProps } from 'antd/lib/time-picker'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import locale from 'antd/lib/date-picker/locale/en_US'
import styles from './TimeInput.module.less'

interface TimeInputProps extends TimePickerProps {
  label?: string
}

export const TimeInput: FC<TimeInputProps> = ({ label = '', ...props }) => {
  const { t } = useTranslation('common')

  return (
    <div className={styles.timeInputContainer}>
      <p>{label}</p>
      <TimePicker
        {...props}
        value={
          moment(props?.value, 'HH:mm', true).isValid() ||
          moment(props?.value, 'HH:mm:ss', true).isValid()
            ? props?.value
            : null
        }
        format="HH:mm"
        placeholder="--:--"
        locale={{
          ...locale,
          lang: {
            ...locale.lang,
            now: t('ui.timeinput.btns.now'),
            ok: t('ui.timeinput.btns.ok'),
          },
        }}
      />
    </div>
  )
}

export default TimeInput
