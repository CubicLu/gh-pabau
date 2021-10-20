import React, { FC } from 'react'
import { Typography, Affix, Skeleton } from 'antd'
import styles from './InvoiceFooter.module.less'

interface InvoiceButtonProp {
  text: string
  value: number
  valueColor?: string
}

interface InvoiceFooterProp {
  buttons: InvoiceButtonProp[]
  loading: boolean
}

const InvoiceFooter: FC<InvoiceFooterProp> = ({ buttons, loading }) => {
  const { Text } = Typography
  return (
    <Affix offsetBottom={0}>
      <div className={styles.invoiceFooter}>
        {buttons.map((b, i) => {
          return (
            <div key={i}>
              <Text>{b.text}</Text>
              {!loading ? (
                <Text
                  style={{
                    color: b.valueColor ? b.valueColor : '#fff',
                  }}
                >
                  £{(b.value ?? 0).toFixed(2)}
                </Text>
              ) : (
                <Skeleton.Input
                  active={true}
                  size="small"
                  className={styles.footerSkeleton}
                />
              )}
            </div>
          )
        })}
      </div>
    </Affix>
  )
}

export default InvoiceFooter
