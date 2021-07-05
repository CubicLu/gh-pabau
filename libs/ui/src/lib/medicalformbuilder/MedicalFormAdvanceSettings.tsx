import { LanguageDropdown, Notification, NotificationType } from '@pabau/ui'
import {
  Button,
  Checkbox,
  Col,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Typography,
} from 'antd'
import classNames from 'classnames'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './MedicalFormAdvance.module.less'

interface P {
  formSaveLabel: string
  changeFormSaveLabel: (string) => void
}

const MedicalFormAdvanceSettings: FC<P> = ({
  formSaveLabel = '',
  changeFormSaveLabel,
}) => {
  const { t } = useTranslation('common')
  const { Title } = Typography
  const { TextArea } = Input
  const { Option } = Select

  const [languageForms] = useState([
    {
      id: 1,
      name: 'Medical Form Upload & Creation',
    },
    {
      id: 2,
      name: 'Medicale Bonjour le Upload',
    },
  ])
  const [headings, setHeadings] = useState('use_to_separate')
  const [submitButtonLabel, setSubmitButtonLabel] = useState(
    formSaveLabel === '' ? t('ui.medicalformbuilder.form.save') : formSaveLabel
  )
  const [shareCopyWithClient, setShareCopyWithClient] = useState(false)
  const [sendReminderToClient, setSendReminderToClient] = useState(false)
  const [redirectType, setRedirectType] = useState('ty_page')
  const [tyTextType, setTyTextType] = useState('plain_text')
  const [plainText, setPlainText] = useState('')
  const [richText, setRichText] = useState('')
  const [shareLinkWithPabau, setShareLinkWithPabau] = useState(false)
  const [addSocialAnalytics, setAddSocialAnalytics] = useState(false)
  const [enablePayProcessing, setEnablePayProcessing] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState(0)
  const [cardNo, setCardNo] = useState('')
  const [cardExp, setCardExp] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [selectedLanguageForm, setSelectedLanguageForm] = useState(1)
  const [selectedLanguage, setSelectedLanguage] = useState('English (UK)')

  const onChangeLanguageForm = (form) => {
    setSelectedLanguageForm(form)
  }
  const onChangeLanguage = (val) => {
    setSelectedLanguage(val)
  }

  const tyTextChange = (e) => {
    if (tyTextType === 'plain_text') {
      setPlainText(e.target.value)
    } else {
      setRichText(e.target.value)
    }
  }

  const onAddCardDetails = () => {
    Notification(NotificationType.success, 'Card Added.')
  }

  const onChangeSubmitButtonLabel = (label) => {
    setSubmitButtonLabel(label)
    changeFormSaveLabel?.(label)
  }

  return (
    <div className={styles.medicalFormSettingsContainer}>
      <div className={styles.banner}>
        <Title level={5}>
          {t('ui.medicalformbuilder.advanced.banner.title')}
        </Title>
        <label>{t('ui.medicalformbuilder.advanced.banner.description')}</label>
      </div>
      <div className={styles.formContainer}>
        <Title level={5}>
          {t('ui.medicalformbuilder.advanced.lang.title')}
        </Title>
        <div className={styles.formGroup}>
          <p>{t('ui.medicalformbuilder.advanced.lang.description')}</p>
          <div className={styles.selectedLanguageContainer}>
            <div className={styles.selectedLanguage}>
              <div className={styles.left}>
                <LanguageDropdown
                  value={selectedLanguage}
                  onSelected={(val) => onChangeLanguage(val)}
                />
              </div>
              <div className={styles.center}>
                <Select
                  value={selectedLanguageForm}
                  onChange={(form) => onChangeLanguageForm(form)}
                  style={{ width: '100%' }}
                >
                  {languageForms.map((m, i) => {
                    return (
                      <Option key={i} value={m.id}>
                        {m.name}
                      </Option>
                    )
                  })}
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.formContainer}>
        <Title level={5}>
          {t('ui.medicalformbuilder.advanced.basic.title')}
        </Title>
        <p>{t('ui.medicalformbuilder.advanced.basic.description')}</p>
        <div className={styles.formGroup}>
          <p>{t('ui.medicalformbuilder.advanced.basic.heading')}</p>
          <Radio.Group
            onChange={(e) => setHeadings(e.target.value)}
            value={headings}
          >
            <Radio value={'use_to_separate'}>
              {t('ui.medicalformbuilder.advanced.basic.heading.separate')}
            </Radio>
            <Radio value={'use_to_create_section'}>
              {t('ui.medicalformbuilder.advanced.basic.heading.section')}
            </Radio>
          </Radio.Group>
        </div>
        <div className={styles.formGroup}>
          <p>{t('ui.medicalformbuilder.advanced.basic.submit')}</p>
          <Input
            value={submitButtonLabel}
            onChange={(e) => onChangeSubmitButtonLabel(e.target.value)}
            placeholder={t(
              'ui.medicalformbuilder.advanced.basic.submit.placeholder'
            )}
          />
        </div>
        <div className={styles.formGroup}>
          <div>
            <Checkbox
              onChange={(e) => setShareLinkWithPabau(e.target.checked)}
              checked={shareLinkWithPabau}
            >
              {t('ui.medicalformbuilder.advanced.basic.sharelink')}
            </Checkbox>
          </div>
          <div>
            <Checkbox
              onChange={(e) => setAddSocialAnalytics(e.target.checked)}
              checked={addSocialAnalytics}
            >
              {t('ui.medicalformbuilder.advanced.basic.social')}
              <InputNumber style={{ width: '100%' }} min={0} step={1} />
            </Checkbox>
          </div>
        </div>
      </div>
      <div className={styles.formContainer}>
        <Title level={5}>
          {t('ui.medicalformbuilder.advanced.acknowledgement.title')}
        </Title>
        <label>
          {t('ui.medicalformbuilder.advanced.acknowledgement.description')}
        </label>

        <div
          className={classNames(
            styles.tyAlertContainer,
            redirectType === 'ty_page' ? styles.tyAlertContainerSelected : null
          )}
        >
          <div>
            <Radio.Group
              onChange={(e) => setRedirectType(e.target.value)}
              value={redirectType}
            >
              <Radio value={'ty_page'}>
                {t(
                  'ui.medicalformbuilder.advanced.acknowledgement.thankpage.title'
                )}
              </Radio>
            </Radio.Group>
            <div>
              <label>
                {t(
                  'ui.medicalformbuilder.advanced.acknowledgement.thankpage.description'
                )}
              </label>
            </div>
          </div>

          <div className={styles.tyWhiteContainer}>
            <div>
              <Radio.Group
                onChange={(e) => setTyTextType(e.target.value)}
                value={tyTextType}
              >
                <Radio value={'plain_text'}>
                  {t('ui.medicalformbuilder.advanced.acknowledgement.ty.plain')}
                </Radio>
                <Radio value={'rich_text'}>
                  {t('ui.medicalformbuilder.advanced.acknowledgement.ty.rich')}
                </Radio>
              </Radio.Group>
            </div>
            <div className={styles.formGroup}>
              <TextArea
                rows={4}
                onChange={tyTextChange}
                value={tyTextType === 'plain_text' ? plainText : richText}
              />
            </div>
            <div className={styles.formGroup}>
              <div>
                <Checkbox
                  onChange={(e) => setShareCopyWithClient(e.target.checked)}
                  checked={shareCopyWithClient}
                >
                  {t(
                    'ui.medicalformbuilder.advanced.acknowledgement.sharecopy'
                  )}
                </Checkbox>
              </div>
              <div>
                <Checkbox
                  onChange={(e) => setSendReminderToClient(e.target.checked)}
                  checked={sendReminderToClient}
                >
                  {t(
                    'ui.medicalformbuilder.advanced.acknowledgement.sendreminder'
                  )}
                </Checkbox>
              </div>
            </div>
          </div>
        </div>
        <div
          className={classNames(
            styles.tyAlertContainer,
            redirectType === 'redirect' ? styles.tyAlertContainerSelected : null
          )}
        >
          <div className={styles.formGroup}>
            <div>
              <Radio.Group
                onChange={(e) => setRedirectType(e.target.value)}
                value={redirectType}
              >
                <Radio value={'redirect'}>Redirect to</Radio>
              </Radio.Group>
            </div>
            <div>
              <label>
                {t(
                  'ui.medicalformbuilder.advanced.acknowledgement.redirecttype'
                )}
              </label>
            </div>
            <div>
              <TextArea rows={4} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.formContainer}>
        <Title level={5}>
          {t('ui.medicalformbuilder.advanced.payment.title')}
        </Title>
        <label>{t('ui.medicalformbuilder.advanced.payment.description')}</label>
        <div className={styles.formGroup}>
          <Checkbox
            onChange={(e) => setEnablePayProcessing(e.target.checked)}
            checked={enablePayProcessing}
          >
            {t('ui.medicalformbuilder.advanced.payment.enablepay')}
          </Checkbox>
        </div>
        <p>{t('ui.medicalformbuilder.advanced.payment.clientcard')}</p>
        <div className={styles.formGroup}>
          <p>{t('ui.medicalformbuilder.advanced.payment.amount')}</p>
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            step={1}
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(Number(e))}
          />
        </div>
      </div>
      <div className={styles.formContainer} style={{ marginTop: 2 }}>
        <label>{t('ui.medicalformbuilder.advanced.payment.info')}</label>
        <div className={styles.formGroup}>
          <p>{t('ui.medicalformbuilder.advanced.payment.cardnumber')}</p>
          <Input
            value={cardNo}
            onChange={(e) => setCardNo(e.target.value)}
            placeholder={'XXXX-XXXX-XXXX-XXXX'}
          />
        </div>
        <Row gutter={24}>
          <Col span={12}>
            <div className={styles.formGroup}>
              <p>Expiration</p>
              <Input
                value={cardExp}
                onChange={(e) => setCardExp(e.target.value)}
                placeholder={'MM/YY'}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.formGroup}>
              <p>CVV</p>
              <Input
                value={cardCvv}
                onChange={(e) => setCardCvv(e.target.value)}
                placeholder={'XXX'}
              />
            </div>
          </Col>
        </Row>
        <div className={styles.formGroup}>
          <Button
            disabled={!cardNo || !cardExp || !cardCvv}
            type="primary"
            block
            onClick={onAddCardDetails}
          >
            {t('ui.medicalformbuilder.advanced.payment.addcard')}
          </Button>
        </div>
        <div className={styles.formGroup} style={{ marginBottom: 20 }}>
          <label>{t('ui.medicalformbuilder.advanced.payment.detail')}</label>
        </div>
      </div>
    </div>
  )
}

export default MedicalFormAdvanceSettings
