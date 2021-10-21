import React, { FC } from 'react'
import {
  CheckCircleFilled,
  EditOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import styles from './verification.module.less'
import ClassNames from 'classnames'
import { Input, Rate, Tooltip } from 'antd'
//import { tooltip } from '../../../mocks/connect/confirmMock'
import { productType } from './conformation'
import { Button } from '@pabau/ui'

/* eslint-disable-next-line */
export interface VerificationProps {
  clinic: string
  docname: string
  date: string
  time: string
  charge: string
  address: string
  type: string
  image: any
  translation: (val: string) => string
  clickable?: boolean
  gotofirst?: () => void
  gotoclinic?: () => void
  gotoemploy?: () => void
  gotodate?: () => void
  gotoedit?: () => void
}
export interface renderProductProps {
  products: productType
  type: string
  tooltip: string
}
export const Verification: FC<VerificationProps> = ({
  clinic,
  docname,
  date,
  time,
  charge,
  type,
  address,
  image,
  translation,
  gotofirst,
  gotoclinic,
  gotoemploy,
  gotodate,
  gotoedit,
  clickable = false,
}) => {
  //const { t } = useTranslationI18()
  return (
    <div className={styles.appWrapper}>
      <div className={styles.applicationWrap}>
        <div className={styles.confirmBox}>
          <h5>
            {translation('connect.onlinebooking.verification.appoitmenttype')}{' '}
            {clickable && <EditOutlined onClick={gotofirst} />}
          </h5>

          <p>{type}</p>
          {console.log(docname)}
        </div>
        <div className={styles.confirmBox}>
          <h5>
            {translation('connect.onlinebooking.verification.clinic')}{' '}
            {clickable && <EditOutlined onClick={gotoclinic} />}
          </h5>

          <p>{clinic}</p>
        </div>
        <div className={styles.confirmBox}>
          <h5> {translation('connect.onlinebooking.verification.address')} </h5>
          <p>{address}</p>
        </div>
      </div>
      <div className={styles.applicationWrap}>
        <div className={styles.confirmBox}>
          <h5>
            {translation('connect.onlinebooking.verification.seeing')}{' '}
            {clickable && <EditOutlined onClick={gotoemploy} />}
          </h5>
          <div className={styles.imgTag}>
            <img src={image} alt={'nothing'} />
            <p>{docname}</p>
          </div>
        </div>
        <div className={styles.confirmBox}>
          <h5>
            {translation('connect.onlinebooking.verification.date')}{' '}
            {clickable && <EditOutlined onClick={gotodate} />}
          </h5>
          <p>{date}</p>
        </div>
        <div className={styles.confirmBox}>
          <h5>
            {translation('connect.onlinebooking.verification.time')}{' '}
            {clickable && <EditOutlined onClick={gotoedit} />}
          </h5>

          <p>{time}</p>
        </div>
        <div className={styles.confirmBox}>
          <h5>
            {translation('connect.onlinebooking.verification.appoitmentprice')}
          </h5>
          <p>£ {charge}</p>
        </div>
      </div>
    </div>
  )
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
            console.log(dataObj.key)
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
        {/*{fixed normal eslint issue}*/}

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
