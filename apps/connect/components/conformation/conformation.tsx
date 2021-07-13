import React, { FC } from 'react'
import { Button } from '@pabau/ui'
//import { InfoCircleOutlined, CheckCircleFilled } from '@ant-design/icons'
//import { Rate, Tooltip } from 'antd'
import styles from './conformation.module.less'
import { Verification, RenderProduct } from './verification'
import { tooltip } from '../../../web/mocks/connect/confirmMock'

export interface datatype {
  key: number
  name: string
  oldprice: string
  newprice: number
  image: any
  active: boolean
}
export interface normaltype {
  key: number
  name: string
  price: number
  image: any
  active: boolean
}
export interface productType {
  promoInput: string
  setpromoInput: (val: string) => void
  Scount: number
  setScount: (val: number) => void
  Pcount: number
  setPcount: (val: number) => void
  Sprice: number
  setSprice: (val: number) => void
  Pprice: number
  setPprice: (val: number) => void
  extra: number
  setextra: (val: number) => void
  data: datatype[]
  normal: normaltype[]
  setdata: (val: datatype[]) => void
  setnormal: (val: normaltype[]) => void
}
export interface ConformationProps {
  changescreen: () => void
  clinic: string
  docname: string
  date: string
  time: string
  charge: string
  address: string
  type: string
  image: any
  services: number
  translation: (val: string) => string
  submitBtn?: boolean
  backToStep?: (val: number) => void
  products: productType
  // sub?: boolean
}

const Conformation: FC<ConformationProps> = ({
  changescreen,
  clinic,
  docname,
  date,
  time,
  charge,
  address,
  type,
  services,
  submitBtn = true,
  image,
  translation,
  backToStep,
  products,
}) => {
  const course = () => {
    if (products.Sprice) {
      return String((products.Sprice * (100 - products.extra)) / 100)
    } else {
      return String((Number(charge) * (100 - products.extra)) / 100)
    }
  }
  return (
    <div className={styles.confirmMainWrapper}>
      <div className={styles.contentWrap}>
        <h6>
          {translation('connect.onlinebooking.conformation.conform.title')}
        </h6>
        <Verification
          clinic={clinic}
          docname={docname}
          date={date}
          time={time}
          charge={
            type === 'Laser'
              ? course()
              : String(
                  ((Number(charge) + products.Sprice + products.Pprice) *
                    (100 - products.extra)) /
                    100
                )
          }
          address={address}
          image={image}
          type={type}
          translation={translation}
          clickable={true}
          backToStep={backToStep}
        />
        {}
        <RenderProduct products={products} type={type} tooltip={tooltip} />
        {submitBtn && products.Scount > 0 && (
          <div className={styles.footerStick}>
            {services === 1 ? `1 service` : `${services} services`}
            {products.Scount === 1
              ? `, 1 course`
              : `, ${products.Scount} courses`}
          </div>
        )}
        {submitBtn && (
          <div className={styles.submitonfirm}>
            <Button
              className={styles.btnConfirm}
              type={'primary'}
              onClick={() => {
                //console.log(promoInput === 'ACd678' ? price - 25 : price)
                //getprice(products.Sprice + products.Pprice, products.extra)
                changescreen()
              }}
            >
              {translation('connect.onlinebooking.conformation.conformbutton')}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
export default Conformation
