import React, { FC } from 'react'
import styles from './ChooseSMSTemplate.module.less'
import { FullScreenReportModal, SimpleDropdown, Smstext } from '@pabau/ui'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { useTranslation } from 'react-i18next'

export interface ChooseSMSTemplateProps {
  modalVisible?: boolean
  handleClose?: () => void
  selectTemplate?: string
  onSelectTemplate: (string) => void
  searchText?: string
  onSearchTextChange: (string) => void
  templateList?: smsTemplateProps[]
  onChooseSmsTemplate?: (arg: smsTemplateProps) => void
  chooseSmsTemplate?: smsTemplateProps
}

export interface smsTemplateProps {
  id: number
  message: string
  name: string
  templateHTML?: React.ReactNode
}

export const ChooseSMSTemplate: FC<ChooseSMSTemplateProps> = ({
  modalVisible = false,
  handleClose,
  selectTemplate,
  onSelectTemplate,
  searchText,
  onSearchTextChange,
  templateList = [],
  onChooseSmsTemplate,
  chooseSmsTemplate,
}) => {
  const { t } = useTranslation('common')

  const handleSelectClick = (template) => {
    if (template && onChooseSmsTemplate) {
      onChooseSmsTemplate(template)
    }
  }
  return (
    <FullScreenReportModal
      title={t('notifications.chooseSMSTemplates.title')}
      operations={[]}
      visible={modalVisible}
      onBackClick={handleClose}
    >
      <div className={styles.smsTempWrap}>
        <div className={styles.boxWrap}>
          <h5>Choose SMS Template</h5>
          <div className={styles.templateWrap}>
            <div className={styles.dropBox}>
              <SimpleDropdown
                dropdownItems={[t('notifications.chooseTemplate.allTemplate')]}
                onSelected={onSelectTemplate}
                value={selectTemplate}
                size={'large'}
              />
            </div>
            <div className={styles.dropBox}>
              <Input
                placeholder={t('notifications.chooseTemplate.searchTemplate')}
                suffix={<SearchOutlined />}
                onChange={onSearchTextChange}
                value={searchText}
                size={'large'}
              />
            </div>
          </div>
        </div>
        <div className={styles.smsBox}>
          {templateList?.map((template) => {
            return (
              <div className={styles.boxItemWrapper} key={template.id}>
                <div
                  className={`${styles.boxItem} ${
                    chooseSmsTemplate?.id === template.id &&
                    styles.activeTemplate
                  }`}
                  onClick={() => handleSelectClick(template)}
                >
                  <Smstext
                    smsMessage={template.message}
                    myCustomCss={styles.customContainer}
                  />
                </div>
                <div className={styles.textWrap}>{template.name}</div>
              </div>
            )
          })}
        </div>
      </div>
    </FullScreenReportModal>
  )
}

export default ChooseSMSTemplate
