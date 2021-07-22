import React, { FC } from 'react'
import { Typography } from 'antd'
import styles from './InvoiceFooter.module.less'

interface InvoiceButtonProp {
  text: string
  value: number
  valueColor?: string
}

interface InvoiceFooterProp {
  buttons: InvoiceButtonProp[]
}

const InvoiceFooter: FC<InvoiceFooterProp> = ({ buttons }) => {
  const { Text } = Typography

  return (
    <div className={styles.invoiceFooter}>
      {buttons.map((b, i) => {
        return (
          <div key={i}>
            <Text>{b.text}</Text>
            <Text
              style={{
                color: b.valueColor ? b.valueColor : '#fff',
              }}
            >
              £{b.value.toFixed(2)}
            </Text>
          </div>
        )
      })}
    </div>
  )
}

export default InvoiceFooter
