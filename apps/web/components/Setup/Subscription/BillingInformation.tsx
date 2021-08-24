import { FileDoneOutlined } from '@ant-design/icons'
import {
  BillingInformationsQuery,
  useBillingInformationsQuery,
} from '@pabau/graphql'
import { Button, TabMenu } from '@pabau/ui'
import {
  Badge,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Skeleton,
  Typography,
} from 'antd'
import React, { FC, useEffect, useState } from 'react'
import Styles from './SubscriptionComponents.module.less'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'

const BillingInformation: FC = () => {
  const { Title, Paragraph, Link } = Typography
  const { Password } = Input
  const [form] = Form.useForm()
  const { t } = useTranslationI18()
  const [editPayment, setEditPayment] = useState(false)
  const [info, setInfo] = useState<BillingInformationsQuery>()
  const { data, loading } = useBillingInformationsQuery()

  useEffect(() => {
    if (data !== undefined) {
      setInfo(data)
    }
  }, [data])

  const renderBillingInformation = () => {
    return (
      <div>
        <div style={{ paddingTop: 25, paddingRight: 24 }}>
          <Title style={{ paddingBottom: 8 }}>
            {t('setup.subscription.billing-information')}
          </Title>
          <Paragraph className={Styles.billingTitleParagraph}>
            {t('setup.subscription.billing-information-info')},
          </Paragraph>
          <Paragraph className={Styles.billingTitleParagraph}>
            {t('setup.subscription.see-the')}{' '}
            <Link
              className={Styles.link}
              href={`https://pabau.com/pricing/`}
              target="_blank"
            >
              {t('setup.subscription.billing-activity-page')}{' '}
            </Link>{' '}
            {t('setup.subscription.for-full-billing')} .
          </Paragraph>
        </div>
        <Divider />
        <div style={{ padding: '0 24px', display: 'flex' }}>
          <Button
            size="large"
            type="primary"
            shape="circle"
            backgroundColor="#EEF7FB"
            className={Styles.billingBtn}
            title={info?.subscription?.status}
            icon={<FileDoneOutlined size={28} />}
          />
          <div style={{ marginLeft: 24 }}>
            <Paragraph style={{ marginBottom: 8 }}>
              {t('setup.subscription.bill-estimate')}
            </Paragraph>
            {loading ? (
              <Skeleton.Input
                active={loading}
                className={Styles.skeletonBillingInformation}
              />
            ) : (
              <div>
                <Paragraph className={Styles.blackText}>
                  £ {info?.subscription?.amount?.toFixed(2)} (
                  {info?.subscription?.interval_unit})
                </Paragraph>
                {loading ? (
                  <Skeleton.Input
                    active={loading}
                    className={Styles.skeletonBillingInformation}
                  />
                ) : (
                  <Paragraph type="secondary" className={Styles.font12p}>
                    *{t('setup.subscription.next-charge')}:{' '}
                    {new Date(
                      info?.subscription?.next_charge_date
                    ).toLocaleDateString('en-GB')}
                  </Paragraph>
                )}
              </div>
            )}
          </div>
        </div>
        <Divider />
        <div style={{ padding: '0 24px' }}>
          <Paragraph className={Styles.subTitle}>
            {t('setup.subscription.payment-fee')}
          </Paragraph>
          <Paragraph
            type="secondary"
            style={{ marginTop: 20 }}
            className={Styles.font12p}
          >
            {t('setup.subscription.card-payment')}
          </Paragraph>
          {loading ? (
            <Skeleton.Input
              active={loading}
              className={Styles.skeletonBillingInformation}
            />
          ) : (
            <Paragraph className={Styles.blackText}>
              {info?.subscription?.app_fee ?? '0.00'}%
            </Paragraph>
          )}
          <Paragraph
            type="secondary"
            style={{ marginTop: 8 }}
            className={Styles.font12p}
          >
            *{t('setup.subscription.payment-fee-info')}
          </Paragraph>
          <Paragraph className={Styles.paymentFeeParagraph}>
            {t('setup.subscription.payment-fee-2')},{' '}
            <Link
              className={Styles.link}
              href={`https://pabau.com/pricing/`}
              target="_blank"
            >
              {t('setup.subscription.payment-fee-3')}
            </Link>
          </Paragraph>
        </div>
        <Divider />
        <div style={{ margin: 24 }}>
          <Paragraph className={Styles.subTitle}>
            {t('setup.subscription.company-details')}
          </Paragraph>
          <Paragraph
            type="secondary"
            style={{ marginTop: 20 }}
            className={Styles.font12p}
          >
            {t('setup.subscription.owner-of-company')}
          </Paragraph>
          {loading ? (
            <Skeleton.Input
              active={loading}
              className={Styles.skeletonBillingInformation}
            />
          ) : (
            <Paragraph className={Styles.blackText}>
              {info?.me.Company?.owner?.full_name}
            </Paragraph>
          )}
          <Paragraph
            type="secondary"
            style={{ marginTop: 16 }}
            className={Styles.font12p}
          >
            {t('setup.subscription.address')}
          </Paragraph>
          {loading ? (
            <Skeleton.Input
              active={loading}
              className={Styles.skeletonBillingInformation}
            />
          ) : (
            <Paragraph className={Styles.blackText}>
              {info?.address?.street +
                ' ' +
                info?.address?.city +
                ' ' +
                info?.address?.post_code}
            </Paragraph>
          )}
          <Paragraph
            type="secondary"
            style={{ marginTop: 16 }}
            className={Styles.font12p}
          >
            {t('setup.subscription.subscription-name')}
          </Paragraph>
          {loading ? (
            <Skeleton.Input
              active={loading}
              className={Styles.skeletonBillingInformation}
            />
          ) : (
            <Paragraph className={Styles.blackText}>
              {info?.subscription?.name}
            </Paragraph>
          )}
        </div>
      </div>
    )
  }

  const renderPaymentMethod = () => {
    return (
      <div>
        <div className={Styles.paymentMethodTitle}>
          <div>
            <Title style={{ paddingBottom: 8 }}>
              {t('setup.subscription.your-payment-method')}
            </Title>
            <Paragraph className={Styles.billingTitleParagraph}>
              {t('setup.subscription.your-card-is')},
            </Paragraph>
            <Paragraph className={Styles.billingTitleParagraph}>
              {t('setup.subscription.in-case-your')}
            </Paragraph>
          </div>
          <Badge
            count={t('setup.subscription.soon')}
            style={{ backgroundColor: '#52c41a' }}
          >
            <Button
              type="primary"
              onClick={() => setEditPayment(!editPayment)}
              disabled
            >
              {editPayment
                ? t('setup.subscription.save')
                : t('setup.subscription.edit-payment-method')}
            </Button>
          </Badge>
        </div>
        {editPayment && (
          <>
            <Divider />
            <div className={Styles.paymentMethodHeader}>
              <div style={{ display: 'flex' }}>
                <Button
                  size="large"
                  type="primary"
                  shape="circle"
                  backgroundColor="#EEF7FB"
                  className={Styles.billingBtn}
                  icon={<FileDoneOutlined size={28} />}
                />
                <div style={{ marginLeft: 24 }}>
                  <Paragraph style={{ marginBottom: 8 }}>
                    {t('setup.subscription.bill-estimate')}
                  </Paragraph>
                  <Paragraph className={Styles.blackText}>
                    £ {info?.subscription?.amount?.toFixed(2)} (
                    {info?.subscription?.interval_unit})
                  </Paragraph>
                  <Paragraph type="secondary" className={Styles.font12p}>
                    *{t('setup.subscription.next-charge')}:{' '}
                    {new Date(
                      info?.subscription?.next_charge_date
                    ).toLocaleDateString('en-GB')}
                  </Paragraph>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <Link className={Styles.link}>
                  {t('setup.subscription.view-full-estimate')}
                </Link>
              </div>
            </div>
          </>
        )}
        <Divider />
        <div style={{ padding: '0 24px' }}>
          <Paragraph className={Styles.subTitle}>
            {t('setup.subscription.card-details')}
          </Paragraph>
          <Form
            layout="vertical"
            form={form}
            initialValues={{
              cardOwner: info?.bank?.account_holder_name,
              cardNumber: info?.bank?.last4,
              csc: '',
              expireDate: undefined,
            }}
          >
            <Paragraph
              type="secondary"
              style={{ marginTop: 20 }}
              className={Styles.font12p}
            >
              {t('setup.subscription.card-owner')}
            </Paragraph>
            {editPayment ? (
              <Form.Item
                name="cardOwner"
                rules={[
                  {
                    required: true,
                    message: t('setup.subscription.please-enter-card'),
                  },
                ]}
              >
                <Input
                  placeholder={t('setup.subscription.card-number')}
                  value={info?.bank?.account_holder_name}
                  style={{ maxWidth: 450, marginTop: 2 }}
                />
              </Form.Item>
            ) : loading ? (
              <Skeleton.Input
                active={loading}
                className={Styles.skeletonBillingInformation}
              />
            ) : (
              <Paragraph className={Styles.blackText} style={{ marginTop: 2 }}>
                {info?.bank?.account_holder_name ?? '-'}
              </Paragraph>
            )}
            {editPayment ? (
              <>
                <Paragraph
                  type="secondary"
                  style={{ marginTop: 16 }}
                  className={Styles.font12p}
                >
                  {t('setup.subscription.card-number')}
                </Paragraph>
                <Form.Item
                  name="cardNumber"
                  rules={[
                    {
                      required: true,
                      message: t('setup.subscription.enter-card'),
                    },
                    {
                      max: 16,
                      message: t('setup.subscription.enter-valid-card'),
                    },
                  ]}
                >
                  <Password
                    pattern="\d{4}-\d{4}-\d{4}-\d{4}"
                    type="number"
                    placeholder="**** **** **** ****"
                    style={{ maxWidth: 450, marginTop: 2 }}
                  />
                </Form.Item>
                <Row gutter={16} style={{ maxWidth: 460, flex: 1 }}>
                  <Col span={12} style={{ flex: 1 }}>
                    <Paragraph type="secondary" className={Styles.font12p}>
                      CSC
                    </Paragraph>
                    <Form.Item
                      name="csc"
                      rules={[
                        {
                          required: true,
                          message: t('setup.subscription.enter-csv'),
                        },
                        {
                          max: 3,
                          message: t('setup.subscription.enter-valid-csv'),
                        },
                      ]}
                    >
                      <Input
                        enterKeyHint="next"
                        placeholder="123"
                        pattern="\d*"
                        type="number"
                        maxLength={3}
                        min="1"
                        max="999"
                        style={{ marginTop: 2 }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12} style={{ flex: 1 }}>
                    <Paragraph type="secondary" className={Styles.font12p}>
                      {t('setup.subscription.expiration-date')}
                    </Paragraph>
                    <Form.Item
                      name="expireDate"
                      rules={[
                        {
                          required: true,
                          message: t('setup.subscription.enter-exp-date'),
                        },
                      ]}
                    >
                      <DatePicker
                        format="YYYY/MM"
                        picker="month"
                        placeholder="mm/yy"
                        style={{ width: '100%', marginTop: 2 }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            ) : (
              <div style={{ display: 'flex' }}>
                <div>
                  <Paragraph
                    type="secondary"
                    style={{ marginTop: 16 }}
                    className={Styles.font12p}
                  >
                    {t('setup.subscription.card-number')}
                  </Paragraph>
                  {loading ? (
                    <Skeleton.Input
                      active={loading}
                      className={Styles.skeletonBillingInformation}
                    />
                  ) : (
                    <Paragraph
                      className={Styles.blackText}
                      style={{ marginTop: 2 }}
                    >
                      {info?.bank?.last4
                        ? '**** **** ****' + info?.bank?.last4
                        : '-'}
                    </Paragraph>
                  )}
                </div>
                <div style={{ marginLeft: 40 }}>
                  <Paragraph
                    type="secondary"
                    style={{ marginTop: 16 }}
                    className={Styles.font12p}
                  >
                    {t('setup.subscription.valid-thru')}
                  </Paragraph>
                  {loading ? (
                    <Skeleton.Input
                      active={loading}
                      className={Styles.skeletonBillingInformation}
                    />
                  ) : (
                    <Paragraph
                      className={Styles.blackText}
                      style={{ marginTop: 2 }}
                    >
                      {info?.bank?.exp_year
                        ? info?.bank?.exp_month + '/' + info?.bank?.exp_year
                        : '-'}
                    </Paragraph>
                  )}
                </div>
              </div>
            )}
          </Form>
          {(editPayment && (
            <div style={{ marginTop: 20, maxWidth: 450 }}>
              <Paragraph className={Styles.subTitle}>
                {t('setup.subscription.bank-details')}
              </Paragraph>
              <Form
                layout="vertical"
                form={form}
                initialValues={{
                  bankName: info?.bank?.bank_name,
                  accountNumber: info?.bank?.last4,
                  sortCode: '',
                }}
              >
                <Paragraph
                  type="secondary"
                  style={{ marginTop: 20 }}
                  className={Styles.font12p}
                >
                  {t('setup.subscription.name')}
                </Paragraph>
                <Form.Item
                  name="bankName"
                  rules={[
                    {
                      required: true,
                      message: t('setup.subscription.enter-bank-name'),
                    },
                  ]}
                >
                  <Input
                    placeholder={t('setup.subscription.bank-name')}
                    style={{ marginTop: 2 }}
                  />
                </Form.Item>
                <Row gutter={16} style={{ maxWidth: 460, flex: 1 }}>
                  <Col span={12} style={{ flex: 1 }}>
                    <Paragraph type="secondary" className={Styles.font12p}>
                      {t('setup.subscription.account-number')}
                    </Paragraph>
                    <Form.Item
                      name="accountNumber"
                      rules={[
                        {
                          required: true,
                          message: t('setup.subscription.enter-acc-no'),
                        },
                      ]}
                    >
                      <Password
                        enterKeyHint="next"
                        pattern="\d*"
                        type="number"
                        style={{ marginTop: 2 }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12} style={{ flex: 1 }}>
                    <Paragraph type="secondary" className={Styles.font12p}>
                      {t('setup.subscription.sort-code')}
                    </Paragraph>
                    <Form.Item
                      name="sortCode"
                      rules={[
                        {
                          required: true,
                          message: t('setup.subscription.enter-sort-code'),
                        },
                      ]}
                    >
                      <Input style={{ width: '100%', marginTop: 2 }} />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          )) || (
            <div style={{ marginTop: 20 }}>
              <Paragraph className={Styles.subTitle}>
                {t('setup.subscription.bank-details')}
              </Paragraph>
              <Paragraph
                type="secondary"
                style={{ marginTop: 20 }}
                className={Styles.font12p}
              >
                {t('setup.subscription.bank-name')}
              </Paragraph>
              {loading ? (
                <Skeleton.Input
                  active={loading}
                  className={Styles.skeletonBillingInformation}
                />
              ) : (
                <Paragraph
                  className={Styles.blackText}
                  style={{ marginTop: 2 }}
                >
                  {info?.bank?.bank_name}
                </Paragraph>
              )}
              <div style={{ display: 'flex' }}>
                <div>
                  <Paragraph
                    type="secondary"
                    style={{ marginTop: 16 }}
                    className={Styles.font12p}
                  >
                    {t('setup.subscription.account-number')}
                  </Paragraph>
                  {loading ? (
                    <Skeleton.Input
                      active={loading}
                      className={Styles.skeletonBillingInformation}
                    />
                  ) : (
                    <Paragraph
                      className={Styles.blackText}
                      style={{ marginTop: 2 }}
                    >
                      ************{info?.bank?.account_number_ending}
                    </Paragraph>
                  )}
                </div>
                <div style={{ marginLeft: 40 }}>
                  <Paragraph
                    type="secondary"
                    style={{ marginTop: 16 }}
                    className={Styles.font12p}
                  >
                    {t('setup.subscription.sort-code')}
                  </Paragraph>
                  {loading ? (
                    <Skeleton.Input
                      active={loading}
                      className={Styles.skeletonBillingInformation}
                    />
                  ) : (
                    <Paragraph
                      className={Styles.blackText}
                      style={{ marginTop: 2 }}
                    >
                      {info?.bank?.branch_code ?? '-'}
                    </Paragraph>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <TabMenu
      tabPosition={'left'}
      menuItems={['Billing Information', 'Payment Method']}
    >
      {renderBillingInformation()}
      {renderPaymentMethod()}
    </TabMenu>
  )
}

export default BillingInformation
