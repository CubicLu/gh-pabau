import React, { FC, useState, useEffect } from 'react'
import Layout from '../../../components/Layout/Layout'
import { useUser } from '../../../context/UserContext'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'
import {
  Button,
  VoucherCard,
  NotificationType,
  Notification,
  BasicModal as TermsModal,
} from '@pabau/ui'
import CommonHeader from '../../../components/CommonHeader'
import useWindowSize from '../../../hooks/useWindowSize'
import { ReactComponent as VoucherIcon } from '../../../assets/images/voucher-icon.svg'
import { giftCardSettings } from '../../../mocks/vouchers'
import { Card, Row, Col, Typography, Skeleton } from 'antd'
import Link from 'next/link'
import styles from './index.module.less'
import { useGetVoucherTemplateQuery } from '@pabau/graphql'
import {
  useDeleteVoucherMutation,
  GetVoucherTemplateDocument,
} from '@pabau/graphql'

const { Paragraph } = Typography

const GiftVouchers: FC = () => {
  const { t } = useTranslationI18()
  const size = useWindowSize()
  const user = useUser()

  const [gifts, setGifts] = useState([])
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [selectedVoucher, setSelectedVoucher] = useState(null)

  const CardHeader = (gift) => (
    <div className={styles.header}>
      {size.width > 767 && (
        <div className="leftDiv">
          <h3 className={styles.drugsHeading}>{t('giftvouchers.title')}</h3>
        </div>
      )}
      <div className="rightDiv">
        <Link href="/marketing/vouchers/create">
          <Button type="primary" size="large">
            {t('giftvouchers.create')}
          </Button>
        </Link>
      </div>
    </div>
  )

  useEffect(() => {
    setGifts([
      { ...giftCardSettings(t) },
      { ...giftCardSettings(t) },
      {
        ...giftCardSettings(t),
        gradientType: 'linear-gradient',
        voucherType: 'birthday',
      },
      {
        ...giftCardSettings(t),
        gradientType: 'linear-gradient',
        voucherType: 'valentine',
      },
      {
        ...giftCardSettings(t),
        gradientType: 'radial-gradient',
      },
      {
        ...giftCardSettings(t),
        gradientType: 'linear-gradient',
        voucherType: 'flowers',
      },
    ])
  }, [t])

  const onMenuClick = (key, data) => {
    switch (key) {
      case 4:
        setSelectedVoucher(data)
        setShowTermsModal(() => true)
        break
      default:
        return
    }
  }

  const [deleteVoucherMutation] = useDeleteVoucherMutation({
    onCompleted() {
      Notification(
        NotificationType.success,
        t('marketingvoucher.data.deletedvouchermessage')
      )
    },
  })

  const deleteHandler = (gift) => {
    deleteVoucherMutation({
      variables: {
        where: {
          template_id: gift.voucherNum,
        },
      },
      refetchQueries: [{ query: GetVoucherTemplateDocument }],
    })
  }

  const {
    data: voucherData,
    loading: voucherLoading,
  } = useGetVoucherTemplateQuery()
  return (
    <Layout {...user}>
      <CommonHeader isLeftOutlined title={t('giftvouchers.title')} />
      <div className={styles.giftVoucherMain}>
        <Card title={<CardHeader />}>
          <div className={styles.body}>
            <div className={styles.types}>
              {voucherLoading ? (
                <Skeleton />
              ) : (
                <Row>
                  {gifts ? (
                    voucherData?.templates.map((gift, key) => {
                      return (
                        <Col
                          lg={8}
                          md={12}
                          sm={12}
                          xs={24}
                          key={`col-key-${key * 123}`}
                        >
                          <div className={styles.voucherCard}>
                            <VoucherCard
                              onMenuClick={(key) => onMenuClick(key, gift)}
                              showDrawerMenu={size.width < 768}
                              cardWidth={500}
                              backgroundColor1="#9013FE"
                              backgroundColor2="#BD10E0"
                              gradientType="linear-gradient"
                              borderColor="#000"
                              bookNowButton={true}
                              buttonLabel={t(
                                'giftvouchers.create.label.booknow'
                              )}
                              showMenu={true}
                              voucherType=""
                              voucherNum={gift.template_id}
                              voucherPrice={100}
                              voucherPriceLabel={t(
                                'ui.client.giftvoucher.pricelabel'
                              )}
                              voucherValidForLabel={
                                t('giftvouchers.create.label.validfor') + ': '
                              }
                              voucherValidFor="1 month"
                              voucherSoldPrice={100}
                              voucherSoldPriceLabel={t(
                                'ui.client.giftvoucher.soldpricelabel'
                              )}
                              voucherRelation={gift.template_name}
                              voucherRelationLabel={t(
                                'ui.client.giftvoucher.relationlabel'
                              )}
                              deleteHandler={(key) => deleteHandler(key)}
                              currencyType="£"
                              termsConditions={t(
                                'ui.vouchercard.back.subtitle'
                              )}
                            />
                          </div>
                        </Col>
                      )
                    })
                  ) : (
                    <div className={styles.noDataContent}>
                      <div className={styles.noDataTableBox}>
                        <div className={styles.noDataTextStyle}>
                          <div className={styles.noDataIcon}>
                            <VoucherIcon />
                          </div>
                          <h2>{t('giftvouchers.add.label')}</h2>
                          <p>{t('giftvouchers.no.voucher.label')}</p>
                          <Link href="/marketing/vouchers/create">
                            <Button type="primary" size="large">
                              {t('giftvouchers.create')}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </Row>
              )}
            </div>
          </div>
        </Card>
        <TermsModal
          width={800}
          visible={showTermsModal}
          onCancel={() => {
            setShowTermsModal(() => false)
            setSelectedVoucher(null)
          }}
          title={t('giftvouchers.create.label.terms')}
          closable={size?.width > 767 ? true : false}
        >
          <Paragraph className={styles.modalTerms}>
            {selectedVoucher?.termsConditions}
          </Paragraph>
          {size?.width < 768 && (
            <div className={styles.closeBtn}>
              <Button
                onClick={() => {
                  setShowTermsModal(() => false)
                  setSelectedVoucher(null)
                }}
              >
                {t('common-label-cancel')}
              </Button>
            </div>
          )}
        </TermsModal>
      </div>
    </Layout>
  )
}

export default GiftVouchers
