import React, { useState } from 'react'
import { Breadcrumb, Button, Input, NotificationBanner } from '@pabau/ui'
import Layout from '../../../components/Layout/Layout'
import CommonHeader from '../../../components/CommonHeader'
import classNames from 'classnames'
import { Form, Typography } from 'antd'
import styles from './create.module.less'
import { CheckCircleFilled } from '@ant-design/icons'
import location from '../../../assets/images/location.png'
import locationFill from '../../../assets/images/locationFill.png'
import createBannerPageImage from '../../../assets/images/createBannerPageImage.svg'

import Permissions from './permissions'
const { Title } = Typography

/* eslint-disable-next-line */
export interface CreateProps {}

export function Create(props: CreateProps) {
  const [value, setValue] = useState(0)
  const [hideBanner, setHideBanner] = useState(false)
  const [isPermission, setPermission] = useState(false)

  const createStaff = (): void => {
    console.info('Created Staff')
  }

  return (
    <Layout>
      <CommonHeader
        isLeftOutlined
        reversePath="/team"
        title="Invite teammates"
      />
      <NotificationBanner
        title="Add 1 set to your plan"
        desc="Your monthly price will go up by $ 19 for 1 set added to your monthly plan."
        imgPath={createBannerPageImage}
        allowClose={true}
        setHide={[hideBanner, setHideBanner]}
        showPaymentButton={true}
        showEmail={true}
        showPaymentTitle="Add"
      />

      <div
        className={classNames(styles.tableMainHeading, styles.mobileViewNone)}
      >
        <div style={{ background: '#FFF' }}>
          <Breadcrumb
            items={[
              { breadcrumbName: 'Team', path: 'team' },
              { breadcrumbName: 'Create', path: '' },
            ]}
          />
          <Title>Invite teammates</Title>
        </div>
        <Button
          type={'primary'}
          onClick={
            isPermission ? () => createStaff() : () => setPermission(true)
          }
        >
          {isPermission ? 'Create staff' : 'Set permissions'}
        </Button>
      </div>
      {isPermission ? (
        <Permissions />
      ) : (
        <div className={styles.inviteWrapper}>
          <h4>Invite teammates</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            tempor incididunt ut labore et dolore magna aliqua.{' '}
          </p>

          <div className={styles.locationWrapper}>
            <h5>Where do they work?</h5>
            <div className={styles.addLocation}>
              <div
                className={
                  value === 0
                    ? classNames(styles.locBox, styles.active)
                    : styles.locBox
                }
                onClick={() => setValue(0)}
              >
                <span className={styles.img}>
                  <img
                    src={value === 0 ? locationFill : location}
                    alt={'location'}
                  />
                </span>
                <div className={styles.address}>
                  <h5>London</h5>
                  <p>London road, Sheffield, England</p>
                </div>
                <span className={styles.checkIcon}>
                  <CheckCircleFilled />
                </span>
              </div>
              <div
                className={
                  value === 1
                    ? classNames(styles.locBox, styles.active)
                    : styles.locBox
                }
                onClick={() => setValue(1)}
              >
                <span className={styles.img}>
                  <img
                    src={value === 1 ? locationFill : location}
                    alt={'location'}
                  />
                </span>
                <div className={styles.address}>
                  <h5>Liverpool</h5>
                  <p>Liverpool road, Sheffield, England</p>
                </div>
                <span className={styles.checkIcon}>
                  <CheckCircleFilled />
                </span>
              </div>
            </div>
          </div>
          <div className={styles.formLayout}>
            <div className={styles.dInline}>
              <Form.Item>
                <label>First name</label>
                <Input text={'Joseph'} />
              </Form.Item>
              <Form.Item>
                <label>Last name</label>
                <Input text={'Howard'} />
              </Form.Item>
            </div>
            <div className={styles.dInline}>
              <Form.Item>
                <label>Email</label>
                <Input type={'email'} text={'w.davidson@pabau.com'} />
              </Form.Item>
            </div>
          </div>
        </div>
      )}
      <div className={styles.footerButton}>
        <Button>Cancel</Button>
        <Button
          type={'primary'}
          onClick={
            isPermission ? () => createStaff() : () => setPermission(true)
          }
        >
          {isPermission ? 'Create staff' : 'Set permissions'}
        </Button>
      </div>
    </Layout>
  )
}

export default Create
