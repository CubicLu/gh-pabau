import React, { FC, useState } from 'react'
import Styles from './employ.module.less'
import {
  ArrowLeftOutlined,
  QuestionCircleOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons'
import { Carousel, Badge, Modal } from 'antd'
//import { Button } from '@pabau/ui'
import { useMedia } from 'react-use'
import { data } from '../../../mocks/connect/ScreenTwoMock'
import { ReactComponent as Face } from '../../../assets/images/face.svg'
import { ReactComponent as Hair } from '../../../assets/images/Hair.svg'
import { ReactComponent as Massage } from '../../../assets/images/massage.svg'
//import styles from '../screentwo/screentwo.module.less'
import { ReactComponent as SkinHealth } from '../../../assets/images/skin-health-logo.svg'
import { ReactComponent as LogoSvg } from '../../../../../libs/ui/src/lib/logo/logo.svg'
/* eslint-disable-next-line */
// export interface EmployProps {
//   changescreen: () => void
// }
export interface ArrowProps {
  type: string
  onClick?: () => void
}
export interface EmployData {
  key: number
  name: string
  image: any
  charges?: number
  description?: string
}

export interface EmployProps {
  items: EmployData[]
  changescreen: () => void
  onselect: (value: EmployData) => void
  translation: (val: string) => string
}

const Employes: FC<EmployProps> = ({
  changescreen,
  items,
  onselect,
  translation,
}) => {
  const isMobile = useMedia('(max-width: 768px)', false)
  const [showmodal, setshowmodal] = useState(false)
  const [itemdata, setitesmdata] = useState<EmployData>({
    name: '',
    description: '',
    key: 0,
    image: '',
  })
  const select = (value: EmployData) => {
    changescreen()
    onselect(value)
    // console.log(value)
  }
  // const { t } = useTranslationI18()
  const Arrow = (prop: ArrowProps) => {
    // eslint-disable-next-line react/destructuring-assignment
    const className = prop.type === 'next' ? 'nextArrow' : 'prevArrow'
    return (
      // eslint-disable-next-line react/destructuring-assignment
      <span className={className} onClick={prop.onClick}>
        {/* eslint-disable-next-line react/destructuring-assignment */}
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
          // slidesToShow={isLgScreen ? 3 : isMdScreen ? 2 : 1}
          // slidesToScroll={isLgScreen ? 3 : isMdScreen ? 2 : 1}
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
              {/*<div className={Styles.deskFootertext}>*/}
              {/*  <p>Treatment by Threading/Waxing</p>*/}
              {/*  <Badge dot color={'gray'} />*/}
              {/*  <span className={Styles.textEvrybrow}>Eyebrow Waxing</span>*/}
              {/*</div>*/}
            </div>
            <p className={Styles.dectTextShow}>Show venue reply...</p>
          </div>
        ))}
        {/*<p className={Styles.dectTextShow}>Show venue reply...</p>*/}
      </div>
    )
  }
  return (
    <div className={Styles.mainBox}>
      <h4>{translation('connect.onlinebooking.employes.title')}</h4>
      {items.map((val) => (
        <div
          key={val.key}
          onClick={() => select(val)}
          className={Styles.oldBox}
        >
          <div className={Styles.contentBox}>
            <img src={val.image} className={Styles.userImage} alt={'nothing'} />
            <div className={Styles.userDetailWrapper}>
              <div className={Styles.userDetail}>
                <div className={Styles.userdetailInner}>
                  <p className={Styles.userName}>{val.name}</p>
                  {val.description && (
                    <QuestionCircleOutlined
                      onClick={(e) => {
                        e.stopPropagation()
                        setitesmdata(val)
                        setshowmodal(true)
                      }}
                    />
                  )}
                </div>
                <p>{val?.description}</p>
              </div>

              {/*{val.description && (*/}
              {/*  <Tooltip title={}>*/}
              {/*    {' '}*/}
              {/*    <QuestionCircleOutlined />*/}
              {/*  </Tooltip>*/}
              {/*)}*/}
              <p className={Styles.userCharge}>
                {val.charges ? `£${val.charges}` : ''}
              </p>
            </div>
          </div>
        </div>
      ))}
      <Modal
        visible={showmodal}
        onCancel={() => setshowmodal(false)}
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
          {/*className={Styles.oldBox}*/}
          <div className={Styles.modifuContex}>
            <div className={Styles.contentBox}>
              <img
                src={itemdata.image}
                className={Styles.userImage}
                alt={'nothing'}
              />
              <div className={Styles.userDetailWrapper}>
                <div className={Styles.userDetail}>
                  <p className={Styles.userName}>{itemdata.name}</p>
                  <p>{itemdata.description}</p>
                </div>

                <p className={Styles.userCharge}>
                  {itemdata.charges ? `£${itemdata.charges}` : ''}
                </p>
              </div>
            </div>
          </div>
          <div className={Styles.modifAbout}>
            <span className={Styles.aboutHeader}>About</span>
            <p className={Styles.aboutText}>
              {itemdata.name} has been in the industry for over 30 years and is
              the very best in he field!
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
              What our customers say about {itemdata.name}
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
    </div>
  )
}
export default Employes
