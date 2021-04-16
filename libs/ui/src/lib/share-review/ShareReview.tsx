import React, { FC, useState, useRef } from 'react'
import { toSvg } from 'html-to-image'
import { Card, Image, Rate, Row, Col } from 'antd'
import { StarFilled } from '@ant-design/icons'
import styles from './ShareReview.module.less'
import { ReactComponent as Header } from '../../assets/images/brands/Pabau.svg'
export interface ShareReviewProps {
  text?: string
  reviewScore?: number
  logo?: string | undefined
  companyName?: string
  date?: Date
}
export const getFacebookUrl = (picture: string): string =>
  'http://www.facebook.com/sharer.php?u=https://www.pabau.com&picture=' +
  picture
export const getUrl = async (
  ref: HTMLElement,
  imagePlaceholder: string | undefined
): Promise<string> => {
  return await toSvg(ref || new HTMLElement(), {
    imagePlaceholder,
  })
}
export const ShareReview: FC<ShareReviewProps> = (props: ShareReviewProps) => {
  const [url, setUrl] = useState('')
  const ref = useRef(null)
  return (
    <>
      <div ref={ref}>
        <Card className={url ? styles.cardStyleNone : styles.cardStyleBlock}>
          <div className={styles.mainBox}>
            <div className={styles.m_20}>
              <Row justify="end">
                <Header className={styles.squareBox} />
              </Row>
              <Row>
                <span className={styles.dateStyle}>
                  {props.date?.getDate().toString().padStart(2, '0')}/
                  {props.date &&
                    (props.date.getMonth() + 1).toString().padStart(2, '0')}
                </span>
              </Row>
              <div className={styles.topSpace}>
                <Row>
                  <span className={styles.textStyle}>
                    {'"'}
                    {props.text}
                    {'"'}
                  </span>
                </Row>
              </div>
            </div>
            <Row align="bottom" className={styles.absoluteRow}>
              <Image
                onLoad={async () => {
                  try {
                    if (!ref.current || url) {
                      return
                    }
                    setUrl(
                      await getUrl(
                        ref.current || new HTMLElement(),
                        props?.logo
                      )
                    )
                  } catch (error) {
                    console.log(error)
                  }
                }}
                src={props.logo}
                className={styles.logoSize}
              />
              <Col className={styles.flexOne}>
                <Row justify="space-between">
                  <Col className={styles.colSpace}>
                    <Rate
                      className={styles.starWrap}
                      character={() => (
                        <StarFilled className={styles.starColor} />
                      )}
                      value={props.reviewScore}
                    />
                  </Col>
                  <Col className={styles.colSpace}>
                    <div className={styles.verifiedText}>verified patient</div>
                  </Col>
                </Row>
                <Row>
                  <div className={styles.companyName}>{props.companyName}</div>
                </Row>
              </Col>
            </Row>
          </div>
        </Card>
      </div>
      <Image src={url} />
      <a href={getFacebookUrl(url)}>Share</a>
    </>
  )
}

export default ShareReview
