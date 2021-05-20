import { LeftOutlined, PlusSquareFilled } from '@ant-design/icons'
import { gql, useMutation } from '@apollo/client'
import {
  Breadcrumb,
  Button,
  MobileHeader,
  Notification,
  NotificationType,
  TabMenu,
} from '@pabau/ui'
import { Card, Col, Divider, Row, Typography } from 'antd'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import CreateTaxRateModal from '../../components/Setup/TaxRate/CreateTaxRateModal'
import DefaultTax from '../../components/Setup/TaxRate/DefaultTax'
import TaxRateList from '../../components/Setup/TaxRate/TaxRateList'
import { UserContext } from '../../context/UserContext'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import useWindowSize from '../../hooks/useWindowSize'
import styles from './tax-rate.module.less'

const LIST_QUERY = gql`
  query Taxes($offset: Int, $limit: Int) {
    tax_rates(offset: $offset, limit: $limit, order_by: { id: desc }) {
      id
      name
      is_active
      value
      glCode
      order
    }
  }
`

const ADD_MUTATION = gql`
  mutation insert_tax_rates_one(
    $name: String
    $value: Float
    $isActive: Boolean = true
    $glCode: String
  ) {
    insert_tax_rates_one(
      object: {
        name: $name
        value: $value
        is_active: $isActive
        glCode: $glCode
      }
    ) {
      id
    }
  }
`

export function TaxRate() {
  const user = useContext(UserContext)
  const { Title } = Typography
  const size = useWindowSize()
  const { t } = useTranslationI18()
  const [showCreateTax, setShowCreateTax] = useState(false)

  const [addMutation] = useMutation(ADD_MUTATION, {
    onCompleted() {
      Notification(
        NotificationType.success,
        t('setup.taxrate.notification.create.success')
      )
    },
    onError(err) {
      Notification(
        NotificationType.error,
        t('setup.taxrate.notification.create.error')
      )
    },
  })

  const onCreate = async (values) => {
    await addMutation({
      variables: { ...values, value: Number.parseFloat(values.value) },
      optimisticResponse: {},
      refetchQueries: [
        {
          query: LIST_QUERY,
        },
      ],
    })
  }

  return (
    <div>
      {size.width <= 767 && (
        <MobileHeader className={styles.taxRateMobile}>
          <div className={styles.allContentMobile}>
            <div className={styles.textStyle}>
              <Link href="/setup">
                <LeftOutlined />
              </Link>
              <p>{t('setup.taxrate.heading')}</p>
            </div>
            <div>
              <PlusSquareFilled
                className={styles.plusIconStyle}
                onClick={() => setShowCreateTax(true)}
              />
            </div>
          </div>
        </MobileHeader>
      )}
      <Layout active={'setup/tax-rate'} {...user}>
        <Card
          bodyStyle={{ padding: 0 }}
          className={styles.taxRateMainCard}
          style={{ borderBottomWidth: 0 }}
        >
          <Row className={styles.headerContainer}>
            {size.width > 767 && (
              <>
                <Col>
                  <Breadcrumb
                    breadcrumbItems={[
                      {
                        breadcrumbName: t('navigation-breadcrumb-setup'),
                        path: 'setup',
                      },
                      { breadcrumbName: t('setup.taxrate.heading'), path: '' },
                    ]}
                  />
                  <Title>{t('setup.taxrate.heading')}</Title>
                </Col>
                <Col>
                  <Button type="primary" onClick={() => setShowCreateTax(true)}>
                    {t('setup.taxrate.newbtn')}
                  </Button>
                </Col>
              </>
            )}
          </Row>
          <Divider style={{ margin: 0 }} />
          <TabMenu
            tabPosition={'top'}
            menuItems={[
              t('setup.taxrate.tabs.tab1'),
              t('setup.taxrate.tabs.tab2'),
            ]}
            minHeight={'40vh'}
          >
            <TaxRateList
              listQuery={LIST_QUERY}
              onCreateTaxRate={() => setShowCreateTax(true)}
            />
            <div className={styles.defaultWrap}>
              <DefaultTax />
            </div>
          </TabMenu>
          <CreateTaxRateModal
            visible={showCreateTax}
            onCancel={() => setShowCreateTax(false)}
            onSave={onCreate}
          />
        </Card>
      </Layout>
    </div>
  )
}

export default TaxRate
