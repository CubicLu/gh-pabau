import React, { FC, useState } from 'react'
import { useMedia } from 'react-use'
import classNames from 'classnames'
import {
  Button,
  TabMenu,
  SimpleDropdown,
  Input,
  CopyEmbedCodeModal,
} from '@pabau/ui'
import { Collapse, Form, Alert } from 'antd'
import {
  CheckOutlined,
  CopyOutlined,
  FacebookOutlined,
  InstagramOutlined,
} from '@ant-design/icons'
import { ReactComponent as Code } from '../../../assets/images/code.svg'
import { ReactComponent as Wix } from '../../../assets/images/wix.svg'
import { ReactComponent as Wordpress } from '../../../assets/images/wordpress.svg'
import { promoteData } from './OnlineBookingSetting'
import styles from './style.module.less'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'

const { Panel } = Collapse

export const PromoteTab: FC = () => {
  const { t } = useTranslationI18()

  const isMdScreen = useMedia('(min-width: 768px)', false)
  const ButtonTab = () => {
    const [buttonStyles, setButtonStyles] = useState(promoteData.button)
    const [embedCodeView, setEmbedCodeView] = useState(false)
    const [embedCode, setEmbedCode] = useState('')
    const handleSelectStyle = (item) => {
      const btnStyles = [...buttonStyles]
      for (const style of btnStyles) {
        style.selected = style.title === item.title
      }
      setButtonStyles([...btnStyles])
    }
    return (
      <>
        <div className={styles.promoteTabHeader}>
          <h2>{t('setup.online-booking.promote.button')}</h2>
          <p>{t('setup.online-booking.promote.pick-a-style')}</p>
        </div>
        <div className={styles.promoteButtonTab}>
          {buttonStyles.map((style) => (
            <div
              className={
                style.selected
                  ? classNames(
                      styles.promoteButtonStyleItem,
                      styles.promoteButtonStyleSelected
                    )
                  : styles.promoteButtonStyleItem
              }
              key={style.title}
              onClick={() => handleSelectStyle(style)}
            >
              <div className={styles.buttonPreview}>
                <div>
                  <p>
                    {t(
                      'setup.online-booking.promote.press-this-button-to-try-it-out'
                    )}
                  </p>
                  <div
                    className={styles.buttonPreviewButton}
                    style={{
                      color: style.color,
                      backgroundColor: style.bgColor,
                      border: `1px solid ${style.borderColor}`,
                    }}
                  >
                    {t('setup.online-booking.promote.book-now')}
                  </div>
                </div>
              </div>
              <div className={styles.buttonDesc}>
                <div className={styles.buttonStyleTitle}>
                  {style.selected && (
                    <CheckOutlined style={{ marginRight: '4px' }} />
                  )}{' '}
                  {style.title}
                </div>
                {style.selected && (
                  <div
                    className={styles.copyEmbedCode}
                    onClick={() => {
                      setEmbedCode(style.embedCode)
                      setEmbedCodeView(true)
                    }}
                  >
                    <CopyOutlined />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {embedCodeView && (
          <CopyEmbedCodeModal
            visible={embedCodeView}
            code={embedCode}
            title={t('setup.online-booking.promote.copy-embed-code')}
            subTitle={''}
            modalWidth={600}
            onClose={() => {
              setEmbedCodeView(false)
            }}
            onDownloadImg={() => {
              return
            }}
            onEmailInput={() => {
              return
            }}
          />
        )}
      </>
    )
  }
  const BookingPortalTab = () => {
    const [form] = Form.useForm()
    const [link, setLink] = useState('prelive-connnect.pabau.com/bookings')
    return (
      <>
        <div className={styles.promoteTabHeader}>
          <h2>{t('setup.online-booking.promote.booking-portal')}</h2>
          <p>{t('setup.online-booking.promote.booking-portal-description')}</p>
        </div>
        <div className={styles.promoteBookingPortalTab}>
          <p>{t('setup.online-booking.promote.book-now-link')}</p>
          <p>
            {t('setup.online-booking.promote.book-now-link-description1')}
            <br />
            <br />
            {t('setup.online-booking.promote.book-now-link-description2')}
            <br />
            <br />
            {t('setup.online-booking.promote.book-now-link-description3')}
          </p>
          {isMdScreen && (
            <Form form={form} layout="vertical">
              <Form.Item label="Link">
                <Input text={link} onChange={(val) => setLink(val)} />
                <Button
                  type="primary"
                  icon={<CopyOutlined />}
                  style={{ marginLeft: '1rem' }}
                >
                  {t('setup.online-booking.promote.copy-link')}
                </Button>
              </Form.Item>
            </Form>
          )}
          {!isMdScreen && (
            <Form form={form} layout="vertical">
              <Form.Item label="Link">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <Input text={link} onChange={(val) => setLink(val)} />
                  <Button
                    type="primary"
                    icon={<CopyOutlined />}
                    block
                    style={{ marginTop: '12px' }}
                  >
                    {t('setup.online-booking.promote.copy-link')}
                  </Button>
                </div>
              </Form.Item>
            </Form>
          )}
          <Alert
            message={t('setup.online-booking.promote.attention')}
            description={t(
              'setup.online-booking.promote.please-note-you-are-in-test-mode'
            )}
            type="warning"
          />
        </div>
      </>
    )
  }
  const WidgetTab = () => {
    return (
      <>
        <div className={styles.promoteTabHeader}>
          <h2>{t('setup.online-booking.promote.widget')}</h2>
          <p>{t('setup.online-booking.promote.some-description-here')}</p>
        </div>
        <div className={styles.promoteWidgetTab}>
          <div className={styles.promoteWidgetTabItem}>
            <div className={styles.promoteWidgetConfig}>
              {isMdScreen && (
                <div className={styles.pomoteWidgetSizeSetting}>
                  <div>
                    <Input label="Width" placeHolderText="px" />
                  </div>
                  <div>
                    <Input label="Height" placeHolderText="px" />
                  </div>
                </div>
              )}
              {!isMdScreen && (
                <>
                  <div style={{ marginBottom: '1rem' }}>
                    <Input label="Width" placeHolderText="px" />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <Input label="Height" placeHolderText="px" />
                  </div>
                </>
              )}
              <div
                style={{
                  width: '100%',
                  height: '200px',
                  backgroundColor: '#f7f7f9',
                }}
              />
              <div className={styles.promoteWidgetConfigOps}>
                <Button type="primary">
                  <div>
                    <Code style={{ marginRight: '4px' }} />{' '}
                    {t('setup.online-booking.promote.copy-code')}
                  </div>
                </Button>
                <Button>
                  <div>
                    <Wix style={{ marginRight: '4px' }} />{' '}
                    {t('setup.online-booking.promote.wix')}
                  </div>
                </Button>
                <Button>
                  <div>
                    <Wordpress style={{ marginRight: '4px' }} />{' '}
                    {t('setup.online-booking.promote.wordpress')}
                  </div>
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.promoteWidgetTabAdvanced}>
            <Collapse ghost>
              <Panel
                header={t(
                  'setup.online-booking.builder-apperance-advanced-settings'
                )}
                key="advanced-settings"
              >
                {isMdScreen && (
                  <>
                    <p className={styles.advancedTitle}>
                      {t(
                        'setup.online-booking.promote.simple-URL-builder-for-online-bookings'
                      )}
                    </p>
                    <p className={styles.advancedSubTitle}>
                      {t('setup.online-booking.promote.can-be-used-iframe')}
                    </p>
                  </>
                )}
                <div className={styles.promoteWidgetTabItem}>
                  <SimpleDropdown
                    label={t(
                      'setup.online-booking.promote.pre-select-location'
                    )}
                    value="None"
                    dropdownItems={['None']}
                    onSelected={(val) => val}
                  />
                </div>
                <div className={styles.promoteWidgetTabItem}>
                  <SimpleDropdown
                    label={t(
                      'setup.online-booking.promote.pre-select-group-category'
                    )}
                    value="None"
                    dropdownItems={['None']}
                    onSelected={(val) => val}
                  />
                </div>
                <div className={styles.promoteWidgetTabItem}>
                  <SimpleDropdown
                    label={t(
                      'setup.online-booking.promote.pre-select-category'
                    )}
                    value="None"
                    dropdownItems={['None']}
                    onSelected={(val) => val}
                  />
                </div>
                <div className={styles.promoteWidgetTabItem}>
                  <SimpleDropdown
                    value="None"
                    label={t('setup.online-booking.promote.pre-select-service')}
                    dropdownItems={['None']}
                    onSelected={(val) => val}
                    tooltip="lorem ipsum"
                  />
                </div>
                <div
                  className={styles.promoteWidgetTabItem}
                  style={{ margin: 0 }}
                >
                  <SimpleDropdown
                    value="None"
                    label={t('setup.online-booking.promote.pre-select-staff')}
                    dropdownItems={['None']}
                    onSelected={(val) => val}
                  />
                </div>
              </Panel>
            </Collapse>
          </div>
        </div>
      </>
    )
  }
  const FacebookAppTab = () => {
    return (
      <>
        <div className={styles.promoteTabHeader}>
          <h2>{t('setup.online-booking.promote.facebook-app')}</h2>
          <p>{t('setup.online-booking.promote.facebook-app-description')}</p>
        </div>
        <div className={styles.promoteFacebookAppTab}>
          <div className={styles.facebookAppLearnMore}>
            <p>{t('setup.online-booking.promote.facebook-learn-more1')}</p>
            <p>{t('setup.online-booking.promote.facebook-learn-more2')}</p>
            <p>{t('setup.online-booking.promote.facebook-learn-more')}</p>
          </div>
        </div>
        <div className={styles.socialItem}>
          <div>
            <InstagramOutlined />
          </div>
          <div>
            <span>{t('setup.online-booking.promote.instagram')}</span>
            <span>{t('setup.online-booking.promote.coming-soon')}</span>
          </div>
        </div>
        <div className={styles.socialItem}>
          <div>
            <FacebookOutlined />
          </div>
          <div>
            <span>{t('setup.online-booking.promote.facebook')}</span>
            <span>{t('setup.online-booking.promote.coming-soon')}</span>
          </div>
        </div>
      </>
    )
  }
  return (
    <div className={styles.onlineBookingPromote}>
      <div className={styles.onlineBookingPromotePanel}>
        {isMdScreen && <h2>{t('setup.online-booking.promote')}</h2>}
        <TabMenu
          tabPosition={isMdScreen ? 'left' : 'top'}
          minHeight="1px"
          menuItems={[
            t('setup.online-booking.promote.button'),
            t('setup.online-booking.promote.booking-portal'),
            t('setup.online-booking.promote.widget'),
            t('setup.online-booking.promote.facebook-app'),
          ]}
        >
          <ButtonTab />
          <BookingPortalTab />
          <WidgetTab />
          <FacebookAppTab />
        </TabMenu>
      </div>
    </div>
  )
}

export default PromoteTab
