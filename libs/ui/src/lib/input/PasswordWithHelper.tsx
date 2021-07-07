import {
  CheckCircleFilled,
  CheckCircleTwoTone,
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import { Input, Popover } from 'antd'
import React, { PropsWithChildren, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './PasswordWithHelper.module.less'

interface PasswordWithHelperProps {
  stength?: number
  width?: string
  onChange?: (value: string) => void
  value?: string
  placeholder?: string
}

export function PasswordWithHelper({
  value = '',
  width,
  onChange,
  placeholder = 'New password',
}: PropsWithChildren<PasswordWithHelperProps>): JSX.Element {
  const { t } = useTranslation('common')

  const [pass, setValue] = useState(value)
  const [strength, setStrength] = useState(0)
  const [color, setColor] = useState('red')

  const handleChange = (e) => {
    let strengthRank = 0
    const val = e.target.value
    if (val.length === 0) strengthRank = 0
    if (val.length > 7) strengthRank++
    if (hasNumber(val)) strengthRank++
    if (hasUpperLower(val)) strengthRank++
    if (hasSpecial(val)) strengthRank++
    if (strengthRank === 1 || strengthRank === 0) setColor('red')
    if (strengthRank === 2) setColor('#faad14')
    if (strengthRank === 3) setColor('#6699cc')
    if (strengthRank === 4) setColor('green')
    setStrength(strengthRank)
    setValue(e.target.value)
    onChange?.(e.target.value)
  }

  const hasNumber = (value) => {
    return /\d/.test(value)
  }
  const hasUpperLower = (value) => {
    return /(?=.*[a-z])(?=.*[A-Z])/.test(value)
  }
  const hasSpecial = (value) => {
    return /[^\dA-Za-z]/.test(value)
  }

  const content = (
    <>
      <div className={styles.helperPhase}>
        <p>
          {pass.length > 7 ? <CheckCircleTwoTone /> : <CheckCircleFilled />}
          <span className={styles.helperPhaseStep}>
            {t('account.settings.security.passwordhelper.description1')}
          </span>
        </p>
        <p>
          {hasUpperLower(pass) ? <CheckCircleTwoTone /> : <CheckCircleFilled />}
          <span className={styles.helperPhaseStep}>
            {t('account.settings.security.passwordhelper.description2')}
          </span>
        </p>
        <p>
          {hasNumber(pass) ? <CheckCircleTwoTone /> : <CheckCircleFilled />}
          <span className={styles.helperPhaseStep}>
            {t('account.settings.security.passwordhelper.description3')}
          </span>
        </p>
        <p>
          {hasSpecial(pass) ? <CheckCircleTwoTone /> : <CheckCircleFilled />}
          <span className={styles.helperPhaseStep}>
            {t('account.settings.security.passwordhelper.description4')}
          </span>
        </p>
      </div>
      <div className={styles.helperStrength}>
        <div className={styles.strengthStart}>
          {t('account.settings.security.passwordhelper.statustitle')}
        </div>
        <div className={styles.strengthEnd} style={{ color: color }}>
          {strength === 1
            ? t('account.settings.security.passwordhelper.statusweek')
            : strength === 2
            ? t('account.settings.security.passwordhelper.statusfair')
            : strength === 3
            ? t('account.settings.security.passwordhelper.statusgood')
            : strength === 4
            ? t('account.settings.security.passwordhelper.statusstrong')
            : ''}
        </div>
      </div>
      <div className={styles.helperPercent}>
        <div
          className={styles.helperPercentStepPass}
          style={{ borderBottom: `3px solid ${color}` }}
        />
        <div
          className={styles.helperPercentStepPass}
          style={{ borderBottom: `3px solid ${color}` }}
        />
        <div
          className={styles.helperPercentStepPass}
          style={{ borderBottom: `3px solid ${color}` }}
        />
        <div
          className={styles.helperPercentStepPass}
          style={{ borderBottom: `3px solid ${color}` }}
        />
      </div>
    </>
  )
  return (
    <Popover placement="right" content={content}>
      <Input.Password
        value={pass}
        placeholder={placeholder}
        iconRender={(visible) =>
          visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
        }
        style={{ width: width }}
        onChange={handleChange}
      />
    </Popover>
  )
}

export default PasswordWithHelper
