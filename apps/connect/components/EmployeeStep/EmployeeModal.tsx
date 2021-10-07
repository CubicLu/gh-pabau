import React, { FC, useState } from 'react'
import { Staff } from '../../types/staff'
import Styles from './EmployeeSelector.module.less'
import { ReactComponent as SkinHealth } from '../../assets/images/skin-health-logo.svg'
import { ReactComponent as Hair } from '../../../../libs/ui/src/assets/images/Hair.svg'
import { ReactComponent as Face } from '../../../../libs/ui/src/assets/images/face.svg'
import { ReactComponent as Massage } from '../../../../libs/ui/src/assets/images/massage.svg'
import { ReactComponent as LogoSvg } from '../../../../libs/ui/src/lib/logo/logo.svg'
import { Badge, Carousel, Modal } from 'antd'
import { useMedia } from 'react-use'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'

interface P {
  employeeData: Staff
  visible: boolean
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
const renderdesk = () => {
  return (
    <div>
      <Carousel
        nextArrow={<Arrow type="next" />}
        prevArrow={<Arrow type="prev" />}
        dots={false}
        arrows={true}
      >
        {data.map((item) => (
          <div className={Styles.deskmainbox} key={item.key}>
            <div className={Styles.deskbox}>
              <img src={item.source} alt={'noyhing'} />
              <div className={Styles.deskupperbox}>
                <span className={Styles.deskHeadding}>{item.name}</span>
                <Badge dot color={'gray'} />
                <span className={Styles.deskRatting}>{item.rating}/5</span>
                <Badge dot color={'gray'} />
                <span className={Styles.deskMonth}>
                  {item.month}
                  month ago
                </span>
              </div>
            </div>

            <div className={Styles.deskDescription}>{item.description}</div>
            <div className={Styles.deskFootertext}>
              <p>Treatment by Threading/Waxing</p>
              <Badge dot color={'gray'} />
              <span className={Styles.textEvrybrow}>Eyebrow Waxing</span>
            </div>
          </div>
        ))}
      </Carousel>
      <p className={Styles.dectTextShow}>Show venue reply...</p>
    </div>
  )
}
const rendermobile = () => {
  return (
    <div>
      {data.map((item) => (
        <div key={item.key}>
          <div className={Styles.deskmainbox}>
            <div className={Styles.deskbox}>
              <img src={item.source} alt={'nothing'} />
              <div className={Styles.deskupperbox}>
                <span className={Styles.deskHeadding}>{item.name}</span>
                <Badge dot color={'gray'} />
                <span className={Styles.deskRatting}>{item.rating}/5</span>
                <Badge dot color={'gray'} />
                <span className={Styles.deskMonth}>
                  {item.month}
                  month ago
                </span>
              </div>
            </div>

            <div className={Styles.deskDescription}>{item.description}</div>
          </div>
          <p className={Styles.dectTextShow}>Show venue reply...</p>
        </div>
      ))}
    </div>
  )
}

const EmployeeModal: FC<P> = ({ employeeData, visible }) => {
  const [isVisible, setIsVisible] = useState(visible)
  const isMobile = useMedia('(max-width: 768px)', false)
  return (
    <Modal
      visible={visible}
      onCancel={() => setIsVisible(false)}
      footer={false}
    >
      <div className={Styles.mbLogo}> {isMobile && <SkinHealth />}</div>
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
            <img
              src={employeeData.image}
              className={Styles.userImage}
              alt={'nothing'}
            />
            <div className={Styles.userDetailWrapper}>
              <div className={Styles.userDetail}>
                <p className={Styles.userName}>{employeeData.name}</p>
                <p>{employeeData.description}</p>
              </div>

              <p className={Styles.userCharge}>
                {employeeData.charges ? `£${employeeData.charges}` : ''}
              </p>
            </div>
          </div>
        </div>
        <div className={Styles.modifAbout}>
          <span className={Styles.aboutHeader}>About</span>
          <p className={Styles.aboutText}>
            {employeeData.name} has been in the industry for over 30 years and
            is the very best in he field!
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
            What our customers say about {employeeData.name}
          </span>
          {isMobile ? <div>{rendermobile()}</div> : <div>{renderdesk()}</div>}
        </div>
      </div>
      {isMobile && (
        <div className={Styles.mdFooterLogo}>
          <p>{translation('connect.onlinebooking.footer.data')}</p>
          <LogoSvg style={{ height: '15px', width: '60px' }} />
        </div>
      )}
    </Modal>
  )
}

export default EmployeeModal
