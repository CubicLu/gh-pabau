import React, { FC, useContext, useEffect, useState } from 'react'
import { Button, ChooseSMSTemplate, ChooseEmailTemplate } from '@pabau/ui'
import styles from '../../pages/client-notifications/style.module.less'
import { getFlag } from '../../mocks/utils'
import emailTemplate1 from '../../../../libs/ui/src/assets/images/emailTemplate1.png'
import emailTemplate2 from '../../../../libs/ui/src/assets/images/emailTemplate2.png'
import emailTemplate3 from '../../../../libs/ui/src/assets/images/emailTemplate3.png'
import emailTemplate4 from '../../../../libs/ui/src/assets/images/emailTemplate4.png'
import emailTemplate5 from '../../../../libs/ui/src/assets/images/emailTemplate5.png'
import { CloseCircleFilled } from '@ant-design/icons'
import ic_sms from '../../../../libs/ui/src/assets/images/sms_triangle.svg'
import { GlobalContext } from './index'

interface P {
  backGroundColor?: string
  selectLanguage?: string
  type?: string
  name?: string
  smsMessage?: string
  langKey?: string
}

const CustomTemplate: FC<P> = ({
  backGroundColor,
  selectLanguage,
  type = 'email',
  name = '',
  smsMessage,
}) => {
  const smsTemplateList = [
    {
      id: 1,
      message: smsMessage,
      name,
    },
    {
      id: 2,
      message: smsMessage,
      name,
    },
    {
      id: 3,
      message: smsMessage,
      name,
    },
    {
      id: 4,
      message: smsMessage,
      name,
    },
    {
      id: 5,
      message: smsMessage,
      name,
    },
    {
      id: 6,
      message: smsMessage,
      name,
    },
    {
      id: 7,
      message: smsMessage,
      name,
    },
    {
      id: 8,
      message: smsMessage,
      name,
    },
    {
      id: 9,
      message: smsMessage,
      name,
    },
    {
      id: 10,
      message: smsMessage,
      name,
    },
  ]
  const emailTemplateList = [
    {
      id: 1,
      templateHTML: (
        <div>
          <img src={emailTemplate1} alt="emailTemplate" />
        </div>
      ),
      category: ['Marketing'],
      name,
    },
    {
      id: 2,
      templateHTML: (
        <div>
          <img src={emailTemplate2} alt="emailTemplate" />
        </div>
      ),
      category: ['Medical'],
      name,
    },
    {
      id: 3,
      templateHTML: (
        <div>
          <img src={emailTemplate1} alt="emailTemplate" />
        </div>
      ),
      category: ['Medical'],
      name,
    },
    {
      id: 4,
      templateHTML: (
        <div>
          <img src={emailTemplate3} alt="emailTemplate" />
        </div>
      ),
      category: ['Leads'],
      name,
    },
    {
      id: 5,
      templateHTML: (
        <div>
          <img src={emailTemplate2} alt="emailTemplate" />
        </div>
      ),
      category: ['Marketing'],
      name,
    },
    {
      id: 6,
      templateHTML: (
        <div>
          <img src={emailTemplate4} alt="emailTemplate" />
        </div>
      ),
      category: ['Financial'],
      name,
    },
    {
      id: 7,
      templateHTML: (
        <div>
          <img src={emailTemplate5} alt="emailTemplate" />
        </div>
      ),
      category: ['Leads'],
      name,
    },
    {
      id: 8,
      templateHTML: (
        <div>
          <img src={emailTemplate5} alt="emailTemplate" />
        </div>
      ),
      category: ['Financial'],
      name,
    },
    {
      id: 9,
      templateHTML: (
        <div>
          <img src={emailTemplate4} alt="emailTemplate" />
        </div>
      ),
      category: ['Medical'],
      name,
    },
    {
      id: 10,
      templateHTML: (
        <div>
          <img src={emailTemplate3} alt="emailTemplate" />
        </div>
      ),
      category: ['Marketing'],
      name,
    },
  ]

  const {
    setSelectedTemplate,
    selectedTemplate,
    selectService,
    showServiceSpecific,
    t,
  } = useContext(GlobalContext)
  const [openSmsTemplate, setOpenSmsTemplate] = useState(false)
  const [openEmailTemplate, setOpenEmailTemplate] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [selectTemplate, setSelectTemplate] = useState('All Templates')
  const [chooseSmsTemplate, setChooseSmsTemplate] = useState(null)
  const [chooseEmailTemplate, setChooseEmailTemplate] = useState(null)

  useEffect(() => {
    if (selectedTemplate?.email) {
      setChooseEmailTemplate(selectedTemplate.email)
    }
    if (selectedTemplate?.sms) {
      setChooseSmsTemplate(selectedTemplate.sms)
    }
  }, [selectedTemplate])

  const handleClick = () => {
    type === 'sms' ? setOpenSmsTemplate(true) : setOpenEmailTemplate(true)
  }

  const handleSmsModalClose = () => {
    setOpenSmsTemplate(!openSmsTemplate)
  }

  const handleEmailModalClose = () => {
    setOpenEmailTemplate(!openEmailTemplate)
  }

  const removeTemplate = () => {
    if (type === 'email') {
      setChooseEmailTemplate((prevState) => ({
        ...prevState,
        [`${selectLanguage}_${selectService}`]: null,
      }))
      setSelectedTemplate((prevState) => ({
        ...prevState,
        email: {
          ...chooseEmailTemplate,
          [`${selectLanguage}_${selectService}`]: null,
        },
      }))
    }
    if (type === 'sms') {
      setChooseSmsTemplate((prevState) => ({
        ...prevState,
        [`${selectLanguage}_${selectService}`]: null,
      }))
      setSelectedTemplate((prevState) => ({
        ...prevState,
        sms: {
          ...chooseSmsTemplate,
          [`${selectLanguage}_${selectService}`]: null,
        },
      }))
    }
  }

  const handleChooseSmsTemplate = (template) => {
    setChooseSmsTemplate((prevState) => ({
      ...prevState,
      [`${selectLanguage}_${selectService}`]: template,
    }))
    setSelectedTemplate((prevState) => ({
      ...prevState,
      sms: {
        ...chooseSmsTemplate,
        [`${selectLanguage}_${selectService}`]: template,
      },
    }))
    handleSmsModalClose()
  }

  const handleChooseEmailTemplate = (template) => {
    setChooseEmailTemplate((prevState) => ({
      ...prevState,
      [`${selectLanguage}_${selectService}`]: template,
    }))
    setSelectedTemplate((prevState) => ({
      ...prevState,
      email: {
        ...chooseEmailTemplate,
        [`${selectLanguage}_${selectService}`]: template,
      },
    }))
    handleEmailModalClose()
  }

  const selectedEmailTemplate =
    chooseEmailTemplate?.[`${selectLanguage}_${selectService}`]

  const selectedSmsTemplate =
    chooseSmsTemplate?.[`${selectLanguage}_${selectService}`]

  return (
    <>
      <div className={styles.cardAddTemplateContainer} key={type}>
        {((selectedSmsTemplate && type === 'sms') ||
          (selectedEmailTemplate && type === 'email')) && (
          <span className={styles.closeIcon} onClick={removeTemplate}>
            <CloseCircleFilled className={styles.iconSize} />
          </span>
        )}
        {selectedSmsTemplate && type === 'sms' && (
          <div>
            <div className={styles.smsTemplateContainer}>
              <span className={styles.smsText}>
                {
                  chooseSmsTemplate[`${selectLanguage}_${selectService}`]
                    ?.message
                }
              </span>
              <img
                src={ic_sms}
                alt=""
                className={styles.icSms}
                width="8"
                height="14"
              />
            </div>
          </div>
        )}
        {selectedEmailTemplate && type === 'email' && (
          <div className={styles.emailTempWrap}>
            <div className={styles.webTemp}>
              {
                chooseEmailTemplate[`${selectLanguage}_${selectService}`]
                  ?.templateHTML
              }
            </div>
          </div>
        )}
        {((!selectedSmsTemplate && type === 'sms') ||
          (!selectedEmailTemplate && type === 'email')) && (
          <div className={styles.middleSection}>
            <Button
              type="default"
              className={styles.addTemplateTxt}
              onClick={handleClick}
            >
              <img src={getFlag(selectLanguage)} alt="" />
              &nbsp;+ {t('notifications.customTemplate.addTemplate')}
            </Button>
            {showServiceSpecific && selectService && (
              <span className={styles.textService}>{`${t(
                'notifications.customTemplate.forSendingWhen'
              )} '${selectService}' ${t(
                'notifications.customTemplate.isBooked'
              )}`}</span>
            )}
          </div>
        )}
      </div>
      <ChooseSMSTemplate
        templateList={smsTemplateList}
        modalVisible={openSmsTemplate}
        handleClose={handleSmsModalClose}
        searchText={searchText}
        onSearchTextChange={(e) => setSearchText(e.target.value)}
        selectTemplate={selectTemplate}
        onSelectTemplate={setSelectTemplate}
        onChooseSmsTemplate={handleChooseSmsTemplate}
        chooseSmsTemplate={chooseSmsTemplate}
      />
      <ChooseEmailTemplate
        templateList={emailTemplateList}
        modalVisible={openEmailTemplate}
        handleClose={handleEmailModalClose}
        searchText={searchText}
        onSearchTextChange={(e) => setSearchText(e.target.value)}
        selectTemplate={selectTemplate}
        onSelectTemplate={setSelectTemplate}
        onChooseEmailTemplate={handleChooseEmailTemplate}
        chooseEmailTemplate={chooseEmailTemplate}
      />
    </>
  )
}

export default CustomTemplate
