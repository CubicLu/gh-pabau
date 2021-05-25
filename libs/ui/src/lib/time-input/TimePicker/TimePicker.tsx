import { Dayjs } from 'dayjs'
import * as React from 'react'
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

const TimePicker = React.forwardRef<Props, TimePickerProps>((props) => {
  const { t } = useTranslation('common')

  return (
    <div className={styles.timeInputContainer}>
      <p>{props?.label}</p>
      <DatePicker
        {...props}
        picker="time"
        placeholder="--:--"
        value={
          dayjs(props?.value, 'HH:mm', true).isValid() ||
          dayjs(props?.value, 'HH:mm:ss', true).isValid()
            ? props?.value
            : null
        }
        mode="time"
        format="HH:mm"
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
})

TimePicker.displayName = 'TimePicker'

export default TimePicker
