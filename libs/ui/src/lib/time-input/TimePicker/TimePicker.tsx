import { Dayjs } from 'dayjs'
import React, { FC } from 'react'
import DatePicker from './DatePicker'
import { PickerTimeProps } from 'antd/lib/date-picker/generatePicker'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import locale from 'antd/lib/date-picker/locale/en_US'
import { Omit } from 'antd/lib/_util/type'
import styles from '../TimeInput.module.less'

type Props = Omit<PickerTimeProps<Dayjs>, 'picker'>
interface TimePickerProps extends Props {
  label?: string
  value?: Dayjs
}

const TimePicker: FC<TimePickerProps> = ({ ...props }) => {
  const { t } = useTranslation('common')

  return (
    <div className={styles.timeInputContainer}>
      <p>{props?.label}</p>
      <DatePicker
        {...props}
        mode="time"
        picker="time"
        format={props?.format || 'HH:mm'}
        placeholder={props?.placeholder || '--:--'}
        locale={{
          ...locale,
          lang: {
            ...locale.lang,
            now: t('ui.timeinput.btns.now'),
            ok: t('ui.timeinput.btns.ok'),
          },
        }}
        value={
          dayjs(props?.value, 'HH:mm', true).isValid() ||
          dayjs(props?.value, 'HH:mm:ss', true).isValid()
            ? props?.value
            : null
        }
      />
    </div>
  )
}

export default TimePicker
