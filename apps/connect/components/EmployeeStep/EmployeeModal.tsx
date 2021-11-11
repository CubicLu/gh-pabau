import React, { FC, useContext, useState } from 'react'
import { Staff } from '../../types/staff'
import Styles from './EmployeeSelector.module.less'
import { ReactComponent as Hair } from '../../../../libs/ui/src/assets/images/Hair.svg'
import { ReactComponent as Face } from '../../../../libs/ui/src/assets/images/face.svg'
import { ReactComponent as Massage } from '../../../../libs/ui/src/assets/images/massage.svg'
import { ReactComponent as LogoSvg } from '../../../../libs/ui/src/lib/logo/logo.svg'
import { Badge, Carousel, Modal } from 'antd'
import { useMedia } from 'react-use'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import styles from '../Header.module.less'
import { SettingsContext } from '../../context/settings-context'
import moment from 'moment'

interface P {
  employeeData: Staff
  estimatedCost: number
}
export interface ArrowProps {
  type: string
  onClick?: () => void
}

const Arrow = (prop: ArrowProps) => {
  const className = prop.type === 'next' ? 'nextArrow' : 'prevArrow'
  return (
    <span className={className} onClick={prop.onClick}>
      {prop.type === 'next' ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
    </span>
  )
}
const renderdesk = (employeeData) => {
  return (
    <div>
      <Carousel
        nextArrow={<Arrow type="next" />}
        prevArrow={<Arrow type="prev" />}
        dots={false}
        arrows={true}
      >
        {employeeData.Public_User.Public_SocialSurveyFeedback.map((item) => (
          <div className={Styles.deskmainbox} key={item.id}>
            <div className={Styles.deskbox}>
              {/*<img src={item.source} alt={'noyhing'} />*/}
              <div className={Styles.deskupperbox}>
                <span className={Styles.deskHeadding}>
                  {item.feedback_name}
                </span>
                <Badge dot color={'gray'} />
                <span className={Styles.deskRatting}>{item.rating}/5</span>
                <Badge dot color={'gray'} />
                <span className={Styles.deskMonth}>
                  {moment(new Date(item.date * 1000)).fromNow()}
                </span>
              </div>
            </div>

            <div className={Styles.deskDescription}>
              {item.feedback_comment}
            </div>
            <div className={Styles.deskFootertext}>
              {/*<p>Treatment by Threading/Waxing</p>*/}
              <Badge dot color={'gray'} />
              <span className={Styles.textEvrybrow}>{item.service}</span>
            </div>
          </div>
        ))}
      </Carousel>
      <p className={Styles.dectTextShow}>Show venue reply...</p>
    </div>
  )
}
const rendermobile = (employeeData) => {
  return (
    <div>
      {employeeData.Public_User.Public_SocialSurveyFeedback.map((item) => (
        <div key={item.id}>
          <div className={Styles.deskmainbox}>
            <div className={Styles.deskbox}>
              {/*<img src={item.source} alt={'nothing'} />*/}
              <div className={Styles.deskupperbox}>
                <span className={Styles.deskHeadding}>
                  {item.feedback_name}
                </span>
                <Badge dot color={'gray'} />
                <span className={Styles.deskRatting}>{item.rating}/5</span>
                <Badge dot color={'gray'} />
                <span className={Styles.deskMonth}>
                  {moment(new Date(item.date * 1000)).fromNow()}
                </span>
              </div>
            </div>

            <div className={Styles.deskDescription}>
              {item.feedback_comment}
            </div>
          </div>
          <p className={Styles.dectTextShow}>Show venue reply...</p>
        </div>
      ))}
    </div>
  )
}

const EmployeeModal: FC<P> = ({ employeeData, estimatedCost }) => {
  const [isVisible, setIsVisible] = useState(true)
  const isMobile = useMedia('(max-width: 768px)', false)
  const settings = useContext(SettingsContext)
  const { t } = useTranslationI18()
  return (
    <Modal
      visible={isVisible}
      onCancel={(e) => {
        setIsVisible(false)
        e.stopPropagation()
      }}
      onOk={(e) => {
        e.stopPropagation()
      }}
      footer={false}
    >
      <div className={Styles.mbLogo}>
        {isMobile && (
          <img
            src={settings.pod_url + settings.details.logo}
            alt={settings.details.name}
            className={styles.headerLogo}
          />
        )}
      </div>
      <div>
        {isMobile && (
          <div className={Styles.mbHeding}>
            <span>Select employee</span> <br />
            <p>Step 3/8</p>
          </div>
        )}
      </div>
      <div>
        <div className={Styles.modifuContex}>
          <div className={Styles.contentBox}>
            {employeeData.Avatar !== '' && (
              <img
                src={settings.pod_url + employeeData.Avatar}
                className={Styles.userImage}
                alt={'nothing'}
              />
            )}
            <div className={Styles.userDetailWrapper}>
              <div className={Styles.userDetail}>
                <p className={Styles.userName}>
                  {employeeData.Public_User.full_name}
                </p>
                <p>{employeeData.Position}</p>
              </div>

              <p className={Styles.userCharge}>{'£' + estimatedCost}</p>
            </div>
          </div>
        </div>
        <div className={Styles.modifAbout}>
          <span className={Styles.aboutHeader}>About</span>
          <p className={Styles.aboutText}>
            {employeeData.Public_StaffNotes.Dependents.replace(
              /<\/?[^>]+(>|$)/g,
              ''
            )}
          </p>
        </div>
        <div className={Styles.mainServices}>
          <span>Services</span>
          <div className={Styles.innerServices}>
            <Hair />
            <Face />
            <Massage />
          </div>
        </div>
        <div className={Styles.sliderDiv}>
          <span className={Styles.sliderheader}>
            What our customers say about {employeeData.Public_User.full_name}
          </span>
          {isMobile ? (
            <div>{rendermobile(employeeData)}</div>
          ) : (
            <div>{renderdesk(employeeData)}</div>
          )}
        </div>
      </div>
      {isMobile && (
        <div className={Styles.mdFooterLogo}>
          <p>{t('connect.onlinebooking.footer.data')}</p>
          <LogoSvg style={{ height: '15px', width: '60px' }} />
        </div>
      )}
    </Modal>
  )
}

export default EmployeeModal
