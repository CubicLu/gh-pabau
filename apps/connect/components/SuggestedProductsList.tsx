import React, { FC } from 'react'
import styles from './BookingDetailsStep/Verification.module.less'
import ClassNames from 'classnames'
import { Input, Rate, Tooltip } from 'antd'
import { CheckCircleFilled, InfoCircleOutlined } from '@ant-design/icons'
import { Button } from '../../../libs/ui/src/lib/button/Button'
import { renderProductProps } from './BookingDetailsStep/Verification'
import { productType } from './BookingDetailsStep/ConfirmationBox'

export interface renderProductProps {
  products: productType
  type: string
  tooltip: string
}

export const RenderProduct: FC<renderProductProps> = ({
  products,
  type,
  tooltip,
}) => {
  const renderfirst = (dataObj) => {
    return (
      <>
        <div
          className={styles.treatBox}
          onClick={() => {
            if (dataObj.active) {
              products.data.map((item) =>
                item.key === dataObj.key ? (item.active = false) : item
              )
              products.setdata([...products.data])
              products.setScount(products.Scount - 1)
              products.setSprice(products.Sprice - dataObj.newprice)
            } else {
              products.data.map((item) =>
                item.key === dataObj.key ? (item.active = true) : item
              )
              products.setdata([...products.data])
              products.setScount(products.Scount + 1)
              products.setSprice(products.Sprice + dataObj.newprice)
            }
          }}
        >
          <div
            className={ClassNames(
              styles.imgBox,
              dataObj.active && styles.active
            )}
          >
            <Tooltip title={tooltip}>
              <InfoCircleOutlined />
            </Tooltip>
            <CheckCircleFilled />
            <img src={dataObj.image} alt={'nothing'} />
          </div>
        </div>
        <h5>{dataObj.name}</h5>
        <h4>£{dataObj.oldprice}</h4>
        <p>£{dataObj.newprice}</p>
        <Rate disabled defaultValue={5} />
      </>
    )
  }
  const rendernormal = (dataobj) => {
    return (
      <>
        <div
          className={styles.imgBox}
          onClick={() => {
            console.log(dataobj.key)
            if (dataobj.active) {
              products.normal.map((item) =>
                item.key === dataobj.key ? (item.active = false) : item
              )
              products.setnormal([...products.normal])
              products.setPcount(products.Pcount - 1)
              products.setPprice(products.Pprice - dataobj.price)
            } else {
              products.normal.map((item) =>
                item.key === dataobj.key ? (item.active = true) : item
              )
              products.setnormal([...products.normal])
              products.setPcount(products.Pcount + 1)
              products.setPprice(products.Pprice + dataobj.price)
            }
          }}
        >
          <CheckCircleFilled />
          <div className={styles.imgdata}>
            <img src={dataobj.image} alt={'nothing'} />
          </div>
        </div>
        <div className={styles.productDetails}>
          <h5>{dataobj.name}</h5>
          <h4>£{dataobj.price}</h4>
        </div>
        <div>
          <Rate disabled defaultValue={5} />
        </div>
        {/*<span>{dataobj.newprice}</span>*/}
      </>
    )
  }
  return (
    <>
      <div className={styles.treatmentWrap}>
        {type === 'Laser' ? (
          <div className={styles.discText}>
            <h5>Save up to 50% by purchasing a course upfront</h5>
            <div className={styles.productWrapper}>
              {products.data.map((iteam) => (
                <div
                  className={ClassNames(
                    styles.productTreatBox,
                    iteam.active && styles.dataactive
                  )}
                  key={iteam.key}
                >
                  {renderfirst(iteam)}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.discText}>
            <h5>We recommend these products after your treatment</h5>
            <div className={styles.productWrapper}>
              {products.normal.map((iteam) => (
                <div
                  className={ClassNames(
                    iteam.active ? styles.productBox1 : styles.productBox
                  )}
                  key={iteam.key}
                >
                  {rendernormal(iteam)}
                </div>
              ))}
            </div>
            <h6>
              Just click above and we will hold back the item for you when you
              come in
            </h6>
          </div>
        )}
      </div>
      <div className={styles.promoCode}>
        <h5>Have a promotion or voucher code?</h5>
        <div className={styles.inputWrap}>
          <Input
            value={products.promoInput}
            placeholder="Enter promo code"
            onChange={(value) => products.setpromoInput(value.target.value)}
          />
          <Button
            className={products.promoInput === 'STUD10' && styles.active}
            disabled={products.promoInput === 'STUD10' ? false : true}
            onClick={() => {
              // setapply(true)
              products.setextra(10)
            }}
          >
            Apply
          </Button>
        </div>
      </div>
    </>
  )
}
//export default Verification
