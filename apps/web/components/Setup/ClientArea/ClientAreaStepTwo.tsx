import { Badge, BasicModal, Button, PabauPlus, TabMenu } from '@pabau/ui'
import React, { FC, useState } from 'react'
import { useMedia } from 'react-use'
import widgetModalImg from '../../../assets/images/widget-modal.png'
import { ClientAreaWidgets, defaultWidgetsData } from './ClientAreaSetting'
import { useGetCompanyMetaQuery } from '@pabau/graphql'
import styles from './Style.module.less'
import { Skeleton } from 'antd'

interface ClientAreaStepTwoProps {
  settings: ClientAreaWidgets
}

export const ClientAreaStepTwo: FC<ClientAreaStepTwoProps> = () => {
  const isMobile = useMedia('(max-width: 767px)', false)
  const isMdScreen = useMedia('(min-width: 992px)', false)
  const [visible, setVisible] = useState(false)
  const [setting, setSetting] = useState<ClientAreaWidgets>(defaultWidgetsData)
  const [currentWidget, setCurrentWidget] = useState({
    mainKey: '',
    id: 0,
    isEnabled: false,
  })

  //QUERY
  const { data: companyData, loading } = useGetCompanyMetaQuery({
    variables: {
      name: [
        'online_booking_enabled',
        'online_class_sign_up',
        'online_courses',
        'online_gift_vouchers',
      ],
    },
  })

  const handleClickWidgetOps = () => {
    const widgets = { ...setting }
    widgets[currentWidget.mainKey].widgets[
      currentWidget.id
    ].isEnabled = !currentWidget.isEnabled
    setSetting({ ...widgets })
    setVisible(false)
  }

  return (
    <>
      <div className={styles.clientAreaBody}>
        <TabMenu
          tabPosition={isMobile ? 'top' : 'left'}
          menuItems={Object.keys(setting).map((item) => setting[item].title)}
          minHeight="1px"
        >
          {Object.keys(setting).map((item) => (
            <div className={styles.clientAreaWidgets} key={setting[item].title}>
              <div className={styles.clientAreaWidgetsHeader}>
                <p className={styles.clientAreaWidgetsHeaderTitle}>
                  {setting[item].title}
                </p>
                <p className={styles.clientAreaWidgetsHeaderDesc}>
                  {setting[item].description}
                </p>
              </div>
              {setting[item].widgets.map((widget) => (
                <div
                  className={styles.clientAreaWidget}
                  key={widget.title}
                  onClick={() => {
                    setVisible(true)
                    setCurrentWidget({
                      isEnabled: widget.isEnabled,
                      mainKey: item,
                      id: widget.id,
                    })
                  }}
                >
                  <div>{widget.icon}</div>
                  <div>
                    <p className={styles.clientAreaWidgetTitle}>
                      <span style={{ marginRight: '8px' }}>{widget.title}</span>
                      {widget.isPlus && <PabauPlus modalType="Marketing" />}
                    </p>
                    <p className={styles.clientAreaWidgetDesc}>
                      {widget.description}
                    </p>
                  </div>
                  <div className={styles.clientAreaWidgetStatus}>
                    {loading === false ? (
                      <Badge
                        label={
                          companyData?.findManyCompanyMeta.find((element) => {
                            return element
                          }).meta_value
                        }
                        disabled={widget.isEnabled}
                      />
                    ) : (
                      <Skeleton />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </TabMenu>
      </div>
      {visible && (
        <BasicModal
          visible={visible}
          footer={null}
          wrapClassName={styles.widgetModal}
          width={isMdScreen ? '870px' : 'calc(100% - 32px)'}
          onCancel={() => setVisible(false)}
        >
          <div className={styles.widgetModalContainer}>
            <div>
              <p className={styles.widgetModalTitle}>
                {setting[currentWidget.mainKey].widgets[currentWidget.id].title}
              </p>
              <p className={styles.widgetModalDesc}>
                Select Expire all user passwords and then click Save to expire
                the passwords for all of the users in your organization. The
                next time they log in, they will be asked to set their passwords
                to a new value.
              </p>
              <div className={styles.widgetModalOps}>
                <Button
                  type={!currentWidget.isEnabled ? 'primary' : 'ghost'}
                  onClick={() => handleClickWidgetOps()}
                >
                  {!currentWidget.isEnabled ? 'Enable' : 'Disable'}
                </Button>
              </div>
            </div>
            <div>
              <img src={widgetModalImg} alt="" width="100%" />
            </div>
          </div>
        </BasicModal>
      )}
    </>
  )
}

export default ClientAreaStepTwo
