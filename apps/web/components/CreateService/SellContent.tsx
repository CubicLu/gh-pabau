import React, { FC } from 'react'
import { Avatar } from '@pabau/ui'
import { Button, Rate } from 'antd'
import { EditOutlined, InfoCircleOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { CustomIconComponentProps } from './CreateService'
import styles from './CreateService.module.less'

interface ProductList {
  id: number | string
  name: string
  src: React.ComponentType<
    CustomIconComponentProps | React.SVGProps<SVGSVGElement>
  >
  originalPrice?: string
  price?: string
  rate?: number
}

interface SellContentProps {
  contentType?: string
  title?: string
  appointmentDetails?: DetailsType
  recommendTitle?: string
  productList?: ProductList[]
  recommendFooterText?: string
}

interface DetailsType {
  type?: string
  clinic?: string
  address?: string
  seeingImg?: string
  seeingName?: string
  time?: string
  price?: string
  date?: string
}

const SellContent: FC<SellContentProps> = ({
  contentType,
  title,
  appointmentDetails,
  recommendTitle,
  productList,
  recommendFooterText = null,
}) => {
  const { t } = useTranslation('common')
  return (
    <div className={styles.previewContentWrapper}>
      <h2>
        {title ||
          t(
            'setup.services.servicestab.createmodal.onlinebooking.appointmentdetailstitle'
          )}
      </h2>
      <div className={styles.appointmentDetailsWrapper}>
        <div className={styles.appointmentTypeWrapper}>
          <div>
            <p>
              {t(
                'setup.services.servicestab.createmodal.onlinebooking.appointmenttypelabel'
              )}{' '}
              <EditOutlined />{' '}
            </p>
            <h3>{appointmentDetails?.type}</h3>
          </div>
          <div>
            <p>
              {t(
                'setup.services.servicestab.createmodal.onlinebooking.cliniclabel'
              )}
            </p>
            <h3>{appointmentDetails?.clinic}</h3>
          </div>
          <div>
            <p>
              {t(
                'setup.services.servicestab.createmodal.onlinebooking.addresslabel'
              )}{' '}
              <EditOutlined />{' '}
            </p>
            <h3>
              {t(
                'setup.services.servicestab.createmodal.onlinebooking.addresslondon'
              )}
              <br />
              {t(
                'setup.services.servicestab.createmodal.onlinebooking.addressunit'
              )}
              <br />
              {t(
                'setup.services.servicestab.createmodal.onlinebooking.addressend'
              )}
            </h3>
          </div>
        </div>
        <div className={styles.appointmentDateTimeWrapper}>
          <div>
            <p>
              {t(
                'setup.services.servicestab.createmodal.onlinebooking.seeinglabel'
              )}{' '}
              <EditOutlined />{' '}
            </p>
            <div className={styles.imgAvtar}>
              <Avatar src={appointmentDetails?.seeingImg} />
              <h3>{appointmentDetails?.seeingName}</h3>
            </div>
          </div>
          <div>
            <p>
              {t(
                'setup.services.servicestab.createmodal.onlinebooking.timelabel'
              )}{' '}
              <EditOutlined />{' '}
            </p>
            <h3>{appointmentDetails?.time}</h3>
          </div>
          <div>
            <p>
              {t(
                'setup.services.servicestab.createmodal.onlinebooking.appointmentpricelabel'
              )}
            </p>
            <h3>{appointmentDetails?.price}</h3>
          </div>
          <div>
            <p>
              {t(
                'setup.services.servicestab.createmodal.onlinebooking.datelabel'
              )}{' '}
              <EditOutlined />{' '}
            </p>
            <h3>{appointmentDetails?.date}</h3>
          </div>
        </div>
      </div>
      <div className={styles.recommendedProducts}>
        <h3>{recommendTitle}</h3>
        <div className={styles.productList}>
          {productList?.map((item) => {
            return (
              <div key={item.id} className={styles.singleProduct}>
                <div key={item.id} className={styles.productImg}>
                  {contentType === 'course' && (
                    <InfoCircleOutlined className={styles.courseInfo} />
                  )}
                  {item.src && React.createElement(item.src)}
                </div>
                <span
                  className={
                    contentType === 'service'
                      ? classNames(styles.textEdit, styles.serviceText)
                      : styles.textEdit
                  }
                >
                  {item.name}
                </span>
                {item?.originalPrice && (
                  <span className={styles.prodOrgPrice}>
                    {item.originalPrice}
                  </span>
                )}
                <span
                  className={
                    contentType !== 'course'
                      ? styles.prodPrice
                      : styles.coursePrice
                  }
                >
                  {item.price}
                </span>
                <div className={styles.rateWrap}>
                  <Rate
                    allowHalf
                    value={item?.rate}
                    style={{ color: '#54B2D3' }}
                  />
                </div>
              </div>
            )
          })}
        </div>
        {recommendFooterText && (
          <div className={styles.footerText}>
            <span>{recommendFooterText}</span>
          </div>
        )}
        <div style={{ marginRight: '26px' }}>
          <Button
            className={styles.confirmAppointmentButton}
            type="primary"
            size="large"
          >
            {t(
              'setup.services.servicestab.createmodal.onlinebooking.appointmentconfirmlabel'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SellContent
