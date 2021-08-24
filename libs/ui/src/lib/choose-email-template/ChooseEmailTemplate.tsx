import React, { FC, useState } from 'react'
import styles from './ChooseEmailTemplate.module.less'
import { FullScreenReportModal, SimpleDropdown } from '@pabau/ui'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { useTranslation } from 'react-i18next'

export interface ChooseEmailTemplateProps {
  modalVisible?: boolean
  handleClose?: () => void
  selectTemplate?: string
  onSelectTemplate: (string) => void
  searchText?: string
  onSearchTextChange: (string) => void
  templateList?: emailTemplateProps[]
  onChooseEmailTemplate?: (arg: emailTemplateProps) => void
  chooseEmailTemplate?: emailTemplateProps
}

export interface emailTemplateProps {
  id: number
  templateHTML: React.ReactNode
  category: string[]
}

export const ChooseEmailTemplate: FC<ChooseEmailTemplateProps> = ({
  modalVisible = false,
  handleClose,
  selectTemplate,
  onSelectTemplate,
  searchText,
  onSearchTextChange,
  templateList = [],
  onChooseEmailTemplate,
  chooseEmailTemplate,
}) => {
  const [tempTemplateList, setTempTemplateList] = useState(templateList)
  const { t } = useTranslation('common')

  const handleSelectClick = (template) => {
    if (template && onChooseEmailTemplate) {
      onChooseEmailTemplate(template)
    }
  }

  const onChangeTemplate = (key) => {
    const a: emailTemplateProps[] = []
    if (key !== 'All Templates') {
      for (const template of templateList) {
        if (key?.toString() === template.category.toString()) {
          a.push(template)
        }
      }
      setTempTemplateList(a)
    } else {
      setTempTemplateList(templateList)
    }
    onSelectTemplate(key)
  }

  return (
    <FullScreenReportModal
      title={t('notifications.chooseEmailTemplate.title')}
      operations={[]}
      visible={modalVisible}
      onBackClick={handleClose}
    >
      <div className={styles.emailTempWrap}>
        <div className={styles.boxWrap}>
          <h5>{t('notifications.chooseEmailTemplate.title')}</h5>
          <div className={styles.templateWrap}>
            <div className={styles.dropBox}>
              <SimpleDropdown
                dropdownItems={[
                  t('notifications.chooseTemplate.allTemplates'),
                  t('notifications.chooseEmailTemplate.marketing'),
                  t('notifications.chooseEmailTemplate.leads'),
                  t('notifications.chooseEmailTemplate.financial'),
                  t('notifications.chooseEmailTemplate.medical'),
                ]}
                onSelected={onChangeTemplate}
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
        <div className={styles.emailBox}>
          {tempTemplateList?.map((template) => {
            return (
              <div
                className={styles.boxItemWrapper}
                key={template.id}
                onClick={() => handleSelectClick(template)}
              >
                <div
                  className={`${styles.boxItem} ${
                    chooseEmailTemplate?.id === template.id &&
                    styles.activeTemplate
                  }`}
                >
                  {template.templateHTML}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </FullScreenReportModal>
  )
}

export default ChooseEmailTemplate
