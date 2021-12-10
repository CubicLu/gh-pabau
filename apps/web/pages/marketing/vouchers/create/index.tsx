import React, { FC, useState, useRef } from 'react'
import Layout from '../../../../components/Layout/Layout'
import { useUser } from '../../../../context/UserContext'
import SelectServices from '../../../../components/Marketing/CreateGiftVoucher/SelectServices'
import { useTranslationI18 } from '../../../../hooks/useTranslationI18'
import { Card, Row, Col } from 'antd'
import { Formik } from 'formik'
import { Form, Input, Select } from 'formik-antd'
import * as Yup from 'yup'
import classNames from 'classnames'
import useWindowSize from '../../../..//hooks/useWindowSize'
import {
  defaultThemes,
  defaultBgColors,
  treeData,
} from '../../../../mocks/vouchers'
import {
  HomeOutlined,
  EditOutlined,
  RightOutlined,
  CheckCircleFilled,
  CloudUploadOutlined,
  LeftOutlined,
  PoweroffOutlined,
} from '@ant-design/icons'
import {
  Breadcrumb,
  Switch,
  Wstepper,
  VoucherCard,
  TabMenu,
  PabauPlus,
  Button,
} from '@pabau/ui'
import Link from 'next/link'
import styles from './index.module.less'
import CommonHeader from '../../../../components/CommonHeader'

// const { TextArea } = Input
const { Option } = Select
const { TextArea } = Input

export interface CreateVoucherProps {
  title?: string
}

export const CreateVoucher: FC<CreateVoucherProps> = ({ title }) => {
  const { t } = useTranslationI18()
  const aligns = [styles.pRight, styles.pX, styles.pX, styles.pLeft]
  const bgSelectRef = useRef<HTMLInputElement>(null)
  const user = useUser()

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
  const [themes, updateThemes] = useState(defaultThemes)
  const [showNextBtn, setShowNextBtn] = useState(true)
  const [showExtraBtn, setShowExtraBtn] = useState(false)

  const [formValues, setFormValues] = useState({
    name: '',
    terms: '',
    price: 0,
    validity: '',
    services: '',
    note: '',
    bgColor: defaultBgColors?.[0]?.background,
    bgUrl: '',
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
              items={[
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
        <div className={styles.switchDiv}>
          <span>Sell this voucher online</span>
          <Switch />
        </div>
        <div className={styles.hrefDiv}>
          <Link href="https://connect-lutetia.pabau.me/booking">
            https://connect-lutetia.pabau.me/booking
          </Link>
        </div>
      </div>
    </div>
  )

  const PreviewTab = ({ values }) => (
    <div className={styles.voucherPreview}>
      <div className={styles.previewCard}>
        <div className={styles.vCard}>
          <VoucherCard
            borderColor="#000"
            voucherBackgroundUrl={values?.bgUrl}
            background={values?.bgColor}
            buttonLabel={t('giftvouchers.create.label.booknow')}
            bookNowButton={bookBtn}
            gradientType="linear-gradient"
            termsConditions={values?.terms}
            voucherPrice={values?.price}
            voucherPriceLabel={t('ui.client.giftvoucher.pricelabel')}
            voucherValidFor={values?.validity}
            voucherValidForLabel={
              t('giftvouchers.create.label.validfor') + ': '
            }
            voucherRelation={values?.name}
            voucherRelationLabel={values?.services}
            currencyType="£"
            voucherSoldPrice={values?.price}
            voucherSoldPriceLabel={`${t('giftvouchers.create.label.sold')} 5`}
            voucherNum={100011}
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
              placeholder={t('giftvouchers.create.label.vouchername')}
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
              name="validity"
              size="large"
              placeholder={t('giftvouchers.create.label.validfor')}
              className={styles.w100}
              value={values?.validity || null}
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
              dataSource={treeData}
              onChange={(data) => {
                console.log('D:', data)
                setValue('services', data)
              }}
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
              placeholder={t('giftvouchers.create.label.note')}
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
              <PabauPlus label={t('common-label-plus')} modalType="Marketing" />
            </div>
            <div>
              <Row>
                <Col
                  lg={6}
                  md={6}
                  sm={6}
                  xs={6}
                  className={classNames(styles.bgImgTheme, aligns[0 % 4])}
                >
                  <div
                    onClick={() => {
                      setValue('bgColor', defaultBgColors?.[0]?.background)
                      setValue('bgUrl', null)
                    }}
                  >
                    <PoweroffOutlined />
                  </div>
                  <span>{'None'}</span>
                </Col>
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
                          setValue('bgColor', null)
                          setValue('bgUrl', el.url)
                        }}
                        style={{
                          backgroundImage: `url(${el?.url})`,
                        }}
                        className={
                          el.url === values?.bgUrl && styles.selectedColor
                        }
                      >
                        {el.url === values?.bgUrl && <CheckCircleFilled />}
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
                  <div onClick={() => bgSelectRef?.current.click()}>
                    <CloudUploadOutlined />
                  </div>
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
                {defaultBgColors?.length &&
                  defaultBgColors.map((el, key) => (
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
                          setValue('bgColor', el?.background)
                          setValue('bgUrl', null)
                        }}
                        style={{ background: el.background }}
                        className={
                          el.background === values?.bgColor &&
                          styles.selectedColor
                        }
                      >
                        {el.background === values?.bgColor && (
                          <CheckCircleFilled />
                        )}
                      </div>
                      <span>{el?.name}</span>
                    </Col>
                  ))}
              </Row>
            </div>
          </div>
        </div>
      )}
    </Form>
  )

  const addNewBgImage = async (e, setValue) => {
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
        setValue('bgColor', null)
        setValue('bgUrl', url)
      }
    }
  }

  return (
    <Layout {...user}>
      <CommonHeader isLeftOutlined title={t('giftvouchers.create.label')} />
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
              <div className={styles.voucherBuilderBody}>
                <Wstepper
                  data={steps}
                  active={activeStep}
                  disablePrevStep={false}
                  hideNextStep={!showNextBtn}
                  nextButtonContent={
                    <span className={styles.dFlex}>
                      {t('giftvouchers.create.label.nextstep')}{' '}
                      <RightOutlined className={styles.ml5} />
                    </span>
                  }
                  prevButtonContent={
                    <span className={styles.dFlex}>
                      <LeftOutlined className={styles.mr5} />{' '}
                      {t('giftvouchers.create.label.prevstep')}
                    </span>
                  }
                  onActiveStepChange={(step) =>
                    onStepChange(step, values, handleSubmit)
                  }
                  nextButtonDecorator={
                    showExtraBtn && (
                      <Button
                        type="primary"
                        className={styles.mr10}
                        onClick={() => handleSubmit()}
                      >
                        {t('giftvouchers.create.label.create')}{' '}
                        <RightOutlined />
                      </Button>
                    )
                  }
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
              </div>
              <div className={styles.hidden}>
                <input
                  type="file"
                  accept=".jpg, .png"
                  ref={bgSelectRef}
                  onChange={(e) => addNewBgImage(e, setFieldValue)}
                />
              </div>
            </Card>
          )}
        </Formik>
      </div>
    </Layout>
  )
}

export default CreateVoucher
