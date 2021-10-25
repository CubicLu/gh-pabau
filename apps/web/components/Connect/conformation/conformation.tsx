import React, { FC } from 'react'
import { Button } from '@pabau/ui'
//import { InfoCircleOutlined, CheckCircleFilled } from '@ant-design/icons'
//import { Rate, Tooltip } from 'antd'
import styles from './conformation.module.less'
import { Verification, RenderProduct } from './verification'
import { tooltip } from '../../../mocks/connect/confirmMock'
//import ClassNames from 'classnames'
//import img1 from '../../../assets/images/connect/back.png'
/* eslint-disable-next-line */
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
  gotofirst?: () => void
  gotoclinic?: () => void
  gotoemploy?: () => void
  gotodate?: () => void
  gotoedit?: () => void
  getprice: (price: number, percentage: number) => void
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
  gotofirst,
  gotoclinic,
  gotoemploy,
  gotodate,
  getprice,
  gotoedit,
  products,
}) => {
  // const { t } = useTranslationI18()
  // const setlaserdata = (): datatype[] => {
  //   const obj = products.data.map((item) => ({ ...item, active: false }))
  //   return obj
  // }
  // const [laser, setlaser] = useState<datatype[]>(products.data)
  // const setnormaldata = (): normaltype[] => {
  //   const obj = products.normal.map((item) => ({ ...item, active: false }))
  //   return obj
  // }
  // const [normal, setnormal] = useState<normaltype[]>(products.normal)
  // const [promoInput, setpromoInput] = useState('')
  // //const [apply, setapply] = useState(false)
  // const [Scount, setScount] = useState(0)
  // const [Sprice, setSprice] = useState(0)
  // const [Pcount, setPcount] = useState(0)
  // const [Pprice, setPprice] = useState(0)
  // const [extra, setextra] = useState(0)
  // const renderfirst = (dataObj) => {
  //   return (
  //     <>
  //       <div
  //         className={styles.treatBox}
  //         onClick={() => {
  //           console.log(dataObj.key)
  //           if (dataObj.active) {
  //             products.data.map((item) =>
  //               item.key === dataObj.key ? (item.active = false) : item
  //             )
  //             products.setdata([...products.data])
  //             products.setScount(products.Scount - 1)
  //             products.setSprice(products.Sprice - dataObj.newprice)
  //           } else {
  //             products.data.map((item) =>
  //               item.key === dataObj.key ? (item.active = true) : item
  //             )
  //             products.setdata([...products.data])
  //             products.setScount(products.Scount + 1)
  //             products.setSprice(products.Sprice + dataObj.newprice)
  //           }
  //         }}
  //       >
  //         <div
  //           className={ClassNames(
  //             styles.imgBox,
  //             dataObj.active && styles.active
  //           )}
  //         >
  //           <Tooltip title={tooltip}>
  //             <InfoCircleOutlined />
  //           </Tooltip>
  //           <CheckCircleFilled />
  //           <img src={dataObj.image} alt={'nothing'} />
  //         </div>
  //       </div>
  //       <h5>{dataObj.name}</h5>
  //       <h4>£{dataObj.oldprice}</h4>
  //       <p>£{dataObj.newprice}</p>
  //       <Rate disabled defaultValue={5} />
  //     </>
  //   )
  // }
  // const rendernormal = (dataobj) => {
  //   return (
  //     <>
  //       {/*{fixed normal eslint issue}*/}
  //
  //       <div
  //         className={styles.imgBox}
  //         onClick={() => {
  //           console.log(dataobj.key)
  //           if (dataobj.active) {
  //             products.normal.map((item) =>
  //               item.key === dataobj.key ? (item.active = false) : item
  //             )
  //             products.setnormal([...products.normal])
  //             products.setPcount(products.Pcount - 1)
  //             products.setPprice(products.Pprice - dataobj.price)
  //           } else {
  //             products.normal.map((item) =>
  //               item.key === dataobj.key ? (item.active = true) : item
  //             )
  //             products.setnormal([...products.normal])
  //             products.setPcount(products.Pcount + 1)
  //             products.setPprice(products.Pprice + dataobj.price)
  //           }
  //         }}
  //       >
  //         <CheckCircleFilled />
  //         <img src={dataobj.image} alt={'nothing'} />
  //       </div>
  //       <h5>{dataobj.name}</h5>
  //       <h4>£{dataobj.price}</h4>
  //       {/*<span>{dataobj.newprice}</span>*/}
  //       <Rate disabled defaultValue={5} />
  //     </>
  //   )
  // }
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
          gotofirst={gotofirst}
          gotoclinic={gotoclinic}
          gotodate={gotodate}
          gotoemploy={gotoemploy}
          gotoedit={gotoedit}
        />
        {}
        <RenderProduct products={products} type={type} tooltip={tooltip} />
        {/*<div className={styles.treatmentWrap}>*/}
        {/*  {type === 'Laser' ? (*/}
        {/*    <div className={styles.discText}>*/}
        {/*      <h5>Save up to 50% by purchasing a course upfront</h5>*/}
        {/*      <div className={styles.productWrapper}>*/}
        {/*        {products.data.map((iteam) => (*/}
        {/*          <div*/}
        {/*            className={ClassNames(*/}
        {/*              styles.productTreatBox,*/}
        {/*              iteam.active && styles.dataactive*/}
        {/*            )}*/}
        {/*            key={iteam.key}*/}
        {/*          >*/}
        {/*            {renderfirst(iteam)}*/}
        {/*          </div>*/}
        {/*        ))}*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  ) : (*/}
        {/*    <div className={styles.discText}>*/}
        {/*      <h5>We recommend these products after your treatment</h5>*/}
        {/*      <div className={styles.productWrapper}>*/}
        {/*        {products.normal.map((iteam) => (*/}
        {/*          <div*/}
        {/*            className={ClassNames(*/}
        {/*              styles.productBox,*/}
        {/*              iteam.active && styles.normalactive*/}
        {/*            )}*/}
        {/*            key={iteam.key}*/}
        {/*          >*/}
        {/*            {rendernormal(iteam)}*/}
        {/*          </div>*/}
        {/*        ))}*/}
        {/*      </div>*/}
        {/*      <h6>*/}
        {/*        Just click above and we will hold back the item for you when you*/}
        {/*        come in*/}
        {/*      </h6>*/}
        {/*    </div>*/}
        {/*  )}*/}
        {/*</div>*/}
        {/*<div className={styles.promoCode}>*/}
        {/*  <h5>Have a promotion or voucher code?</h5>*/}
        {/*  <div className={styles.inputWrap}>*/}
        {/*    <Input*/}
        {/*      value={promoInput}*/}
        {/*      placeholder="Enter promo code"*/}
        {/*      onChange={(value) => setpromoInput(value.target.value)}*/}
        {/*    />*/}
        {/*    <Button*/}
        {/*      className={promoInput === 'STUD10' && styles.active}*/}
        {/*      disabled={promoInput === 'STUD10' ? false : true}*/}
        {/*      onClick={() => {*/}
        {/*        // setapply(true)*/}
        {/*        products.setextra(10)*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      Apply*/}
        {/*    </Button>*/}
        {/*  </div>*/}
        {/*</div>*/}
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
                getprice(products.Sprice + products.Pprice, products.extra)
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
