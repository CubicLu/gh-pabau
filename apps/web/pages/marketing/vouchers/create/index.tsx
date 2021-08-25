import React, { FC, useState, useEffect, useRef } from 'react'
import Layout from '../../../../components/Layout/Layout'
// import ExternalLink from '../../../../components/Marketing/CreateGiftVoucher/assets/external-link.svg'
import ActiveIcon from '../../../../components/Marketing/CreateGiftVoucher/assets/active.svg'
import SelectServices from '../../../../components/Marketing/CreateGiftVoucher/SelectServices'
import { useTranslationI18 } from '../../../../hooks/useTranslationI18'
import { Card, Row, Col, Select } from 'antd'
import { Formik } from 'formik'
import { Form, Input } from 'formik-antd'
import * as Yup from 'yup'
import classNames from 'classnames'
import useWindowSize from '../../../..//hooks/useWindowSize'

import { HomeOutlined, EditOutlined, RightOutlined } from '@ant-design/icons'
import {
  Breadcrumb,
  Switch,
  Wstepper,
  VoucherCard,
  TabMenu,
  PabauPlus,
  Button,
  Notification,
  NotificationType,
} from '@pabau/ui'
import Link from 'next/link'
import styles from './index.module.less'
import CommonHeader from '../../../../components/CommonHeader'

// const { TextArea } = Input
const { Option } = Select
const { TextArea } = Input

const defaultThemes = [
  {
    name: 'Love',
    url:
      'https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2020/02/valentines-day-1581614371.jpg',
  },
  {
    name: 'Birthday 1',
    url:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-birthday-instagram-captions-1584723902.jpg',
  },
  {
    name: 'Birthday 2',
    url:
      'https://thumbs.dreamstime.com/b/happy-birthday-cupcake-celebration-message-160558421.jpg',
  },
]

const defaultBgColors = [
  {
    background: 'linear-gradient(105.26deg, #6E4BF6 2.87%, #B94AF4 100%)',
    selected: false,
  },
  {
    background: 'linear-gradient(67.52deg, #FDB720 0%, #E86D22 92.36%)',
    selected: false,
  },
  {
    background: 'linear-gradient(67.52deg, #5AA8FF 0%, #077DFF 92.36%)',
    selected: false,
  },
  {
    background: 'linear-gradient(67.52deg, #00A36E 0%, #00A69B 92.36%)',
    selected: false,
  },
]

export interface CreateVoucherProps {
  title?: string
}

export const CreateVoucher: FC<CreateVoucherProps> = ({ title }) => {
  const { t } = useTranslationI18()
  const aligns = [styles.pRight, styles.pX, styles.pX, styles.pLeft]
  const bgSelectRef = useRef<HTMLInputElement>(null)
  const spanLink = useRef<HTMLSpanElement>(null)

  const size = useWindowSize()

  const steps = [
    {
      img: <HomeOutlined />,
      index: 0,
      isActive: true,
      name: 'Basic',
      step: 1,
    },
    {
      img: <EditOutlined />,
      index: 1,
      isActive: false,
      name: 'Appearance',
      step: 2,
    },
  ]
  const [activeStep, setActiveStep] = useState(0)
  const [bookBtn, setBookBtn] = useState(false)
  const [voucherRelation] = useState(
    t('giftvouchers.create.label.voucherrelation').toString()
  )
  const [voucherRelationLabel] = useState(
    t('giftvouchers.create.label.voucherrelation.para').toString()
  )
  const [voucherBackgrounUrl, setVoucherBackgroundUrl] = useState(null)
  const [themes, updateThemes] = useState([])
  const [bgColors, updateBGColors] = useState([])
  const [selectedBgColor, setSelectedBGColor] = useState(null)

  const [showNextBtn, setShowNextBtn] = useState(true)
  const [showExtraBtn, setShowExtraBtn] = useState(false)

  const [formValues, setFormValues] = useState({
    name: '',
    terms: '',
    price: 0,
    validity: '',
    services: '',
    note: '',
  })

  const step0Schema = Yup.object({
    name: Yup.string()
      .min(
        2,
        t('crud-table-input-min-length-validate', {
          what: t('giftvouchers.create.label.vouchername'),
          min: 2,
        })
      )
      .required(
        t('crud-table-input-required', {
          what: t('giftvouchers.create.label.vouchername'),
        })
      ),
    terms: Yup.string().required(
      t('crud-table-input-required', {
        what: t('giftvouchers.create.label.termscondition'),
      })
    ),
    price: Yup.number()
      .min(0)
      .required(
        t('crud-table-input-required', {
          what: t('giftvouchers.create.label.value'),
        })
      ),
    validity: Yup.string().required(
      t('crud-table-input-required', {
        what: t('giftvouchers.create.label.validfor'),
      })
    ),
    services: Yup.array()
      .of(Yup.number())
      .min(1)
      .required(
        t('crud-table-input-required', {
          what: t('giftvouchers.create.label.services'),
        })
      ),
  })

  const step1Schema = Yup.object({
    note: Yup.string().required('Note is required'),
  })

  const onStepChange = async (step, values, handleSubmit) => {
    switch (step) {
      case 0:
        setFormValues({ ...formValues, ...values })
        setShowNextBtn(true)
        setShowExtraBtn(false)
        setActiveStep(step)
        break

      case 1:
        if (step > activeStep) handleSubmit()
        if (await step0Schema.isValid(values)) {
          setFormValues({ ...formValues, ...values })
          setShowNextBtn(false)
          setShowExtraBtn(true)
          setActiveStep(step)
        }
        if (step < activeStep) setActiveStep(step)
        break

      default:
        return
    }
  }

  const CardHeader = () => (
    <div className={styles.voucherBuilderHeader}>
      {size.width > 767 && (
        <div className={styles.leftCardHeading}>
          <div className={styles.breadcrumbDiv}>
            <Breadcrumb
              breadcrumbItems={[
                {
                  breadcrumbName: t('giftvouchers.create.breadcrumb.vouchers'),
                  path: 'marketing/vouchers',
                },
                {
                  breadcrumbName: t('giftvouchers.create.breadcrumb.create'),
                  path: '',
                },
              ]}
            />
          </div>
          <div className={styles.heading}>{t('giftvouchers.create.label')}</div>
        </div>
      )}
      <div className={styles.rightCardHeadBtns}>
        <div className={styles.emailBtn}>
          <Button type="default" size="large">
            {t('giftvouchers.create.btn.send.email')}
          </Button>
        </div>
        <div className={styles.saveBtn}>
          <Button type="primary" size="large">
            {t('giftvouchers.create.btn.save')}
          </Button>
        </div>
      </div>
    </div>
  )

  const PreviewTab = ({ values }) => (
    <div className={styles.voucherPreview}>
      <div className={styles.previewCard}>
        <div className={styles.card}>
          <VoucherCard
            backgroundColor1="#9013FE"
            backgroundColor2="#BD10E0"
            borderColor="#000"
            voucherBackgrounUrl={voucherBackgrounUrl}
            background={selectedBgColor?.background}
            buttonLabel="Book Now"
            bookNowButton={bookBtn}
            gradientType="linear-gradient"
            termsConditions={values?.terms}
            voucherPrice={values.price}
            voucherPriceLabel={values?.name}
            voucherRelation={voucherRelation}
            voucherRelationLabel={voucherRelationLabel}
            currencyType="£"
            voucherType=""
          />
        </div>
      </div>
    </div>
  )

  const BuilderTab = ({ setValue, values }) => (
    <Form layout="vertical" onFinish={() => false}>
      {activeStep === 0 && (
        <div className={styles.controls}>
          <div className={styles.contDiv}>
            <span className={styles.contHeading}>
              {t('giftvouchers.create.label.vouchersetting')}
            </span>
            <p>{t('giftvouchers.create.label.vouchersetting.para')}</p>
          </div>
          <div className={styles.contDiv}>
            <span className={styles.contHeading}>
              {t('giftvouchers.create.label.voucherinfo')}
            </span>
            <p>{t('giftvouchers.create.label.voucherinfo.para')}</p>
          </div>
          <Form.Item
            className={styles.contDiv}
            name="name"
            label={
              <>
                <span>{t('giftvouchers.create.label.vouchername')}</span>
                <span>{values?.name?.length || 0}/100</span>
              </>
            }
          >
            <Input
              name="name"
              type="text"
              size="large"
              maxLength={100}
              placeholder="Voucher Name"
              value={values?.name}
            />
          </Form.Item>
          <Form.Item
            name="terms"
            className={styles.contDiv}
            label={
              <>
                <span>{t('giftvouchers.create.label.termscondition')}</span>
                <span>{values?.terms?.length || 0}/500</span>
              </>
            }
          >
            <TextArea
              name="terms"
              rows={6}
              placeholder={t('giftvouchers.create.label.termscondition')}
              maxLength={500}
              value={values?.terms}
            />
          </Form.Item>
          <Form.Item
            name="price"
            className={styles.contDiv}
            label={t('giftvouchers.create.label.value')}
          >
            <Input
              name="price"
              addonBefore="£"
              type="number"
              size="large"
              min={0}
              placeholder={t('giftvouchers.create.label.value')}
              value={values?.price}
            />
          </Form.Item>
          <Form.Item
            name="validity"
            className={styles.contDiv}
            label={t('giftvouchers.create.label.validfor')}
          >
            <Select
              size="large"
              placeholder={t('giftvouchers.create.label.validfor')}
              style={{ width: '100%' }}
              value={values?.validity}
              onChange={(data) => setValue('validity', data)}
            >
              <Option value="14 days">
                {t('giftvouchers.create.label.validfor.options1')}
              </Option>
              <Option value="1 month">
                {t('giftvouchers.create.label.validfor.options2')}
              </Option>
              <Option value="2 months">
                {t('giftvouchers.create.label.validfor.options3')}
              </Option>
              <Option value="3 months">
                {t('giftvouchers.create.label.validfor.options4')}
              </Option>
              <Option value="6 months">
                {t('giftvouchers.create.label.validfor.options5')}
              </Option>
              <Option value="1 year">
                {t('giftvouchers.create.label.validfor.options6')}
              </Option>
              <Option value="3 years">
                {t('giftvouchers.create.label.validfor.options7')}
              </Option>
              <Option value="5 years">
                {t('giftvouchers.create.label.validfor.options8')}
              </Option>
              <Option default value="Forever">
                {t('giftvouchers.create.label.validfor.options9')}
              </Option>
            </Select>
          </Form.Item>
          <div className={styles.contDiv}>
            <span className={styles.contHeading}>
              {t('giftvouchers.create.label.servicesincluded')}
            </span>
          </div>
          <Form.Item
            name="services"
            className={styles.contDiv}
            label={t('giftvouchers.create.label.services')}
          >
            <SelectServices
              onChange={(data) => setValue('services', data)}
              data={values?.services}
            />
          </Form.Item>
        </div>
      )}
      {activeStep === 1 && (
        <div className={styles.controls}>
          <div className={styles.contDiv}>
            <span className={styles.contHeading}>
              {t('giftvouchers.create.label.vouchersetting')}
            </span>
            <p>{t('giftvouchers.create.label.vouchersetting.para2')}</p>
          </div>
          <div className={styles.contDiv}>
            <span className={styles.contHeading}>
              {t('giftvouchers.create.vouchertheme')}
            </span>
            <p></p>
          </div>
          <Form.Item name="bookBtn" className={styles.contDiv}>
            <span className={styles.contHeadingMin}>
              {t('giftvouchers.create.label.enablebooking')}
            </span>
            <label>
              <span>{t('giftvouchers.create.label.enablebooking.para')}</span>
            </label>
            <div className={styles.topMargin}>
              <Switch
                checked={bookBtn}
                onChange={() => setBookBtn((bookBtn) => !bookBtn)}
              />{' '}
              <label>{t('giftvouchers.create.label.addbookbtn')}</label>
            </div>
          </Form.Item>
          <Form.Item name="notes" className={styles.contDiv}>
            <span className={styles.contHeadingMin}>
              {t('giftvouchers.create.label.notesforclient')}
            </span>
            <label>
              <span>{t('giftvouchers.create.label.notesforclient.para')}</span>
            </label>
            <div className={styles.topMargin}>
              <Switch defaultChecked={true} />{' '}
              <label>{t('giftvouchers.create.label.enablenotes')}</label>
            </div>
          </Form.Item>
          <Form.Item
            name="note"
            className={styles.contDiv}
            label={
              <>
                <span>{t('giftvouchers.create.label.note')}</span>
                <span>{values?.note?.length || 0}/500</span>
              </>
            }
          >
            <TextArea
              name="note"
              rows={6}
              placeholder="Notes"
              maxLength={500}
              value={values?.note}
            />
          </Form.Item>
          <div className={styles.contDiv}>
            <span className={styles.contHeading}>
              {t('giftvouchers.create.label.appearance')}
            </span>
            <p>{t('giftvouchers.create.label.appearance.para')}</p>
          </div>
          <div className={styles.themesDiv}>
            <div>
              <span>{t('giftvouchers.create.vouchertheme')}</span>
              <PabauPlus label="Plus" modalType="Marketing" />
            </div>
            <div>
              <Row>
                {themes?.length &&
                  themes.map((el, key) => (
                    <Col
                      key={`col-${key}`}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={6}
                      className={classNames(styles.bgImgTheme, aligns[key % 4])}
                    >
                      <div
                        onClick={() => {
                          setSelectedBGColor(null)
                          setVoucherBackgroundUrl(el.url)
                        }}
                        style={{
                          backgroundImage: `url(${el?.url})`,
                        }}
                        className={
                          el.url === voucherBackgrounUrl && styles.selectedColor
                        }
                      >
                        {el.url === voucherBackgrounUrl && (
                          <img src={ActiveIcon} alt="active" />
                        )}
                      </div>
                      <span>{el?.name}</span>
                    </Col>
                  ))}
                <Col
                  lg={6}
                  md={6}
                  sm={6}
                  xs={6}
                  className={classNames(
                    styles.bgImgTheme,
                    aligns[themes.length % 4]
                  )}
                >
                  <div onClick={() => bgSelectRef?.current.click()}></div>
                </Col>
              </Row>
            </div>
          </div>
          <div className={styles.themesDiv}>
            <div>
              <span>{t('giftvouchers.create.label.bgcolors')}</span>
              <span></span>
            </div>
            <div>
              <Row>
                {bgColors?.length &&
                  bgColors.map((el, key) => (
                    <Col
                      key={`col-${key}`}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={6}
                      className={classNames(
                        styles.bgColorTheme,
                        aligns[key % 4]
                      )}
                    >
                      <div
                        onClick={() => {
                          setSelectedBGColor(el)
                          setVoucherBackgroundUrl(null)
                        }}
                        style={{ background: el.background }}
                        className={
                          el.background === selectedBgColor?.background &&
                          styles.selectedColor
                        }
                      >
                        {el.background === selectedBgColor?.background && (
                          <img src={ActiveIcon} alt="active" />
                        )}
                      </div>
                    </Col>
                  ))}
              </Row>
            </div>
          </div>
        </div>
      )}
    </Form>
  )

  useEffect(() => {
    updateThemes(defaultThemes)
    updateBGColors(defaultBgColors)
  }, [])

  const addNewBgImage = async (e) => {
    if (e) {
      const existingThemes = [...themes]
      const file = e.target.files[0]
      if (file) {
        const url = await URL.createObjectURL(file)
        existingThemes.push({
          name: t('giftvouchers.create.label.none'),
          url: url,
        })
        await updateThemes(existingThemes)
        setSelectedBGColor(null)
        setVoucherBackgroundUrl(url)
      }
    }
  }

  const createVoucher = () => {
    Notification(NotificationType['success'], 'Voucher Created Successfully')
    spanLink?.current?.click()
  }

  return (
    <Layout>
      <CommonHeader isLeftOutlined title="Gift Voucher" />
      <div className={styles.mainCreateVoucher}>
        <Formik
          enableReinitialize={true}
          initialValues={formValues}
          validationSchema={activeStep === 0 ? step0Schema : step1Schema}
          onSubmit={async (values) => {
            if (await step0Schema.concat(step1Schema).isValid(values)) {
              console.log(values)
            }
          }}
        >
          {({ setFieldValue, handleSubmit, values }) => (
            <Card title={<CardHeader />}>
              <Row>
                <Col md={24} className={styles.voucherBuilderBody}>
                  <Wstepper
                    disablePrevStep={false}
                    showNextBtn={showNextBtn}
                    nextBtnLabel={
                      <span>
                        {t('giftvouchers.create.label.nextstep')}{' '}
                        <RightOutlined />
                      </span>
                    }
                    active={activeStep}
                    data={steps}
                    onActiveStepChange={(step) =>
                      onStepChange(step, values, handleSubmit)
                    }
                    nextButtonDecorator={
                      showExtraBtn && (
                        <Button
                          type="primary"
                          style={{ marginRight: '10px' }}
                          onClick={() => handleSubmit()}
                        >
                          {t('giftvouchers.create.label.create')}{' '}
                          <RightOutlined />
                        </Button>
                      )
                    }
                    extraBtnClick={createVoucher}
                    allowDisablePrevious={false}
                  >
                    <Row
                      className={classNames(
                        styles.voucherBuilderSection,
                        styles.showDefault,
                        styles.desktopView
                      )}
                    >
                      <Col
                        lg={6}
                        md={24}
                        sm={24}
                        xs={24}
                        className={styles.voucherBuilderControls}
                      >
                        <div className={styles.heading}>
                          <span>{t('giftvouchers.create.tabs.builder')}</span>
                        </div>
                        <BuilderTab setValue={setFieldValue} values={values} />
                      </Col>
                      <Col
                        lg={18}
                        md={24}
                        sm={24}
                        xs={24}
                        className={styles.voucherPreviewSelection}
                      >
                        <div className={styles.heading}>
                          <span>{t('giftvouchers.create.tabs.preview')}</span>
                        </div>
                        <PreviewTab values={values} />
                      </Col>
                    </Row>
                    <Row
                      className={classNames(
                        styles.hideDefault,
                        styles.mobileView
                      )}
                    >
                      <Col md={24}>
                        <TabMenu
                          menuItems={[
                            t('giftvouchers.create.tabs.builder'),
                            t('giftvouchers.create.tabs.preview'),
                          ]}
                          tabPosition="top"
                        >
                          <Row className={styles.voucherBuilderSection}>
                            <Col
                              lg={24}
                              md={24}
                              sm={24}
                              xs={24}
                              className={styles.voucherBuilderControls}
                            >
                              <BuilderTab
                                setValue={setFieldValue}
                                values={values}
                              />
                            </Col>
                          </Row>
                          <Row className={styles.voucherBuilderSection}>
                            <Col
                              lg={24}
                              md={24}
                              sm={24}
                              xs={24}
                              className={styles.voucherPreviewSelection}
                            >
                              <PreviewTab values={values} />
                            </Col>
                          </Row>
                        </TabMenu>
                      </Col>
                    </Row>
                  </Wstepper>
                </Col>
              </Row>
              <Row>
                <Col style={{ display: 'none' }}>
                  <input
                    type="file"
                    accept=".jpg, .png"
                    ref={bgSelectRef}
                    onChange={addNewBgImage}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={24}>
                  <Link href="/marketing/vouchers">
                    <span ref={spanLink}></span>
                  </Link>
                </Col>
              </Row>
            </Card>
          )}
        </Formik>
      </div>
    </Layout>
  )
}

export default CreateVoucher
