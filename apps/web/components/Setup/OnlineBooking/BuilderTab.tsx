import React, { FC, useState, useEffect } from 'react'
import { useMedia } from 'react-use'
import { TabMenu, Checkbox } from '@pabau/ui'
import { Collapse, Form, Input as AntInput, Tooltip, Select } from 'antd'
import {
  CalendarOutlined,
  UserAddOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import onlineBookingPreviewEmpty from '../../../assets/images/online-booking-preview-empty.png'
import { ReactComponent as Palette } from '../../../assets/images/palette.svg'
import {
  OnlineBookingBuilder,
  defaultBuilderData,
} from './OnlineBookingSetting'
import styles from './style.module.less'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'

const { Panel } = Collapse
const { Option } = Select

interface BuilderTabProps {
  builder: OnlineBookingBuilder
}

export const BuilderTab: FC<BuilderTabProps> = ({ builder }) => {
  const { t } = useTranslationI18()

  const [form] = Form.useForm()
  const isMdScreen = useMedia('(min-width: 992px)', false)
  const BuilderPanel = ({ builder }) => {
    const [setting, setSetting] = useState<OnlineBookingBuilder>(
      defaultBuilderData
    )
    useEffect(() => {
      setSetting(builder)
    }, [builder])
    return (
      <Form form={form} layout="vertical">
        <div className={styles.onlineBookingBuilderPanel}>
          <div className={styles.onlineBookingBuilderPanelTitle}>
            <h3>
              <Palette style={{ marginRight: '.5rem' }} />
              <span>{t('setup.online-booking.builder-apperance')}</span>
            </h3>
            <h4>{t('setup.online-booking.builder-apperance-description')}</h4>
          </div>
          <div className={styles.onlineBookingBuilderSetting}>
            {setting.apperance
              .filter((item) => item.advanced !== true)
              .map((item) => (
                <div
                  className={styles.onlineBookingBuilderSettingItem}
                  key={item.title + item.type}
                >
                  {item.type === 'checkbox' && (
                    <Checkbox defaultChecked={item?.checked}>
                      <span>{item.title}</span>
                      {item.tooltip && (
                        <Tooltip placement="top" title={item.tooltip}>
                          <QuestionCircleOutlined
                            style={{ marginLeft: '8px' }}
                          />
                        </Tooltip>
                      )}
                    </Checkbox>
                  )}
                  {item.type === 'dropdown' && (
                    <Form.Item label={item.title} tooltip={item?.tooltip}>
                      <Select
                        defaultValue={item?.value}
                        onSelect={(val) => val}
                      >
                        {item?.items?.map((value) => (
                          <Option key={value} value={value}>
                            {value}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                  {item.type === 'textfield' && (
                    <Form.Item label={item.title} tooltip={item?.tooltip}>
                      <AntInput.TextArea
                        rows={4}
                        placeholder={t(
                          'setup.online-booking.builder-apperance-setting-textarea-placeholder'
                        )}
                      />
                    </Form.Item>
                  )}
                </div>
              ))}
            <Collapse ghost>
              <Panel
                header={t(
                  'setup.online-booking.builder-apperance-advanced-settings'
                )}
                key="advanced"
              >
                {setting.apperance
                  .filter((item) => item.advanced === true)
                  .map((item) => (
                    <div
                      className={styles.onlineBookingBuilderSettingItem}
                      key={item.title + item.type}
                    >
                      {item.type === 'checkbox' && (
                        <Checkbox defaultChecked={item?.checked}>
                          <span>{item.title}</span>
                          {item.tooltip && (
                            <Tooltip placement="top" title={item.tooltip}>
                              <QuestionCircleOutlined
                                style={{ marginLeft: '8px' }}
                              />
                            </Tooltip>
                          )}
                        </Checkbox>
                      )}
                      {item.type === 'dropdown' && (
                        <Form.Item label={item.title} tooltip={item?.tooltip}>
                          <Select
                            defaultValue={item?.value}
                            onSelect={(val) => val}
                          >
                            {item?.items?.map((value) => (
                              <Option key={value} value={value}>
                                {value}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      )}
                      {item.type === 'textfield' && (
                        <Form.Item label={item.title} tooltip={item?.tooltip}>
                          <AntInput.TextArea
                            rows={4}
                            placeholder={t(
                              'setup.online-booking.builder-apperance-setting-textarea-placeholder'
                            )}
                          />
                        </Form.Item>
                      )}
                    </div>
                  ))}
              </Panel>
            </Collapse>
          </div>
          <div className={styles.onlineBookingBuilderPanelTitle}>
            <h3>
              <CalendarOutlined
                style={{ marginRight: '.5rem', color: 'var(--primary-color)' }}
              />
              <span>{t('setup.online-booking.builder-apperance-booking')}</span>
            </h3>
            <h4>
              {t('setup.online-booking.builder-apperance-booking-description')}
            </h4>
          </div>
          <div className={styles.onlineBookingBuilderSetting}>
            {setting.booking
              .filter((item) => item.advanced !== true)
              .map((item) => (
                <div
                  className={styles.onlineBookingBuilderSettingItem}
                  key={item.title + item.type}
                >
                  {item.type === 'checkbox' && (
                    <Checkbox defaultChecked={item?.checked}>
                      <span>{item.title}</span>
                      {item.tooltip && (
                        <Tooltip placement="top" title={item.tooltip}>
                          <QuestionCircleOutlined
                            style={{ marginLeft: '8px' }}
                          />
                        </Tooltip>
                      )}
                    </Checkbox>
                  )}
                  {item.type === 'dropdown' && (
                    <Form.Item label={item.title} tooltip={item?.tooltip}>
                      <Select
                        defaultValue={item?.value}
                        onSelect={(val) => val}
                      >
                        {item?.items?.map((value) => (
                          <Option key={value} value={value}>
                            {value}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                  {item.type === 'textfield' && (
                    <Form.Item label={item.title} tooltip={item?.tooltip}>
                      <AntInput.TextArea
                        rows={4}
                        placeholder={t(
                          'setup.online-booking.builder-apperance-setting-textarea-placeholder'
                        )}
                      />
                    </Form.Item>
                  )}
                </div>
              ))}
            <Collapse ghost>
              <Panel
                header={t(
                  'setup.online-booking.builder-apperance-advanced-settings'
                )}
                key="advanced"
              >
                {setting.booking
                  .filter((item) => item.advanced === true)
                  .map((item) => (
                    <div
                      className={styles.onlineBookingBuilderSettingItem}
                      key={item.title + item.type}
                    >
                      {item.type === 'checkbox' && (
                        <Checkbox defaultChecked={item?.checked}>
                          <span>{item.title}</span>
                          {item.tooltip && (
                            <Tooltip placement="top" title={item.tooltip}>
                              <QuestionCircleOutlined
                                style={{ marginLeft: '8px' }}
                              />
                            </Tooltip>
                          )}
                        </Checkbox>
                      )}
                      {item.type === 'dropdown' && (
                        <Form.Item label={item.title} tooltip={item?.tooltip}>
                          <Select
                            defaultValue={item?.value}
                            onSelect={(val) => val}
                          >
                            {item?.items?.map((value) => (
                              <Option key={value} value={value}>
                                {value}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      )}
                      {item.type === 'textfield' && (
                        <Form.Item label={item.title} tooltip={item?.tooltip}>
                          <AntInput.TextArea
                            rows={4}
                            placeholder={t(
                              'setup.online-booking.builder-apperance-setting-textarea-placeholder'
                            )}
                          />
                        </Form.Item>
                      )}
                    </div>
                  ))}
              </Panel>
            </Collapse>
          </div>
          <div className={styles.onlineBookingBuilderPanelTitle}>
            <h3>
              <UserAddOutlined
                style={{ marginRight: '.5rem', color: 'var(--primary-color)' }}
              />
              <span>
                {t('setup.online-booking.builder-apperance-registration')}
              </span>
            </h3>
            <h4>
              {t(
                'setup.online-booking.builder-apperance-registration-description'
              )}
            </h4>
          </div>
          <div className={styles.onlineBookingBuilderSetting}>
            {setting.registration.map((item) => (
              <div
                className={styles.onlineBookingBuilderSettingItem}
                key={item.title + item.type}
              >
                {item.type === 'checkbox' && (
                  <Checkbox defaultChecked={item?.checked}>
                    <span>{item.title}</span>
                    {item.tooltip && (
                      <Tooltip placement="top" title={item.tooltip}>
                        <QuestionCircleOutlined style={{ marginLeft: '8px' }} />
                      </Tooltip>
                    )}
                  </Checkbox>
                )}
                {item.type === 'dropdown' && (
                  <Form.Item label={item.title} tooltip={item?.tooltip}>
                    <Select defaultValue={item?.value} onSelect={(val) => val}>
                      {item?.items?.map((value) => (
                        <Option key={value} value={value}>
                          {value}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                )}
                {item.type === 'textfield' && (
                  <Form.Item label={item.title} tooltip={item?.tooltip}>
                    <AntInput.TextArea
                      rows={4}
                      placeholder={t(
                        'setup.online-booking.builder-apperance-setting-textarea-placeholder'
                      )}
                    />
                  </Form.Item>
                )}
              </div>
            ))}
          </div>
        </div>
      </Form>
    )
  }
  const PreviewPanel = () => {
    return (
      <div className={styles.onlineBookingPreviewPanel}>
        <img src={onlineBookingPreviewEmpty} alt="" width="100%" />
      </div>
    )
  }
  return (
    <div className={styles.onlineBookingBuilder}>
      {isMdScreen && (
        <div className={styles.onlineBookingBuilderMdScreen}>
          <div>
            <h2>{t('setup.online-booking.builder')}</h2>
            <BuilderPanel builder={builder} />
          </div>
          <div>
            <h2>{t('setup.online-booking.builder-preview')}</h2>
            <PreviewPanel />
          </div>
        </div>
      )}
      {!isMdScreen && (
        <TabMenu
          menuItems={[
            t('setup.online-booking.builder'),
            t('setup.online-booking.builder-preview'),
          ]}
          tabPosition="top"
          minHeight="1px"
        >
          <BuilderPanel builder={builder} />
          <PreviewPanel />
        </TabMenu>
      )}
    </div>
  )
}

export default BuilderTab
