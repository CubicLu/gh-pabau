import React, { FC, useState } from 'react'
import { Typography, Card, Row, Col } from 'antd'
import { Button, Input } from '@pabau/ui'
import { useUser } from '../../../context/UserContext'
import Layout from '../../../components/Layout/Layout'
import EditInvoice from './../../../components/ClientCard/client-financial-layout/invoices/EditInvoice'

const Index: FC = () => {
  const user = useUser()

  const [id, setId] = useState(29574864)
  const [openInvoice, setOpenInvoice] = useState(false)

  return !openInvoice ? (
    <Layout {...user}>
      <Card>
        <Row>
          <Col span={12}>
            <Typography.Title>Edit Invoice</Typography.Title>
            <div style={{ maxWidth: '300px', paddingLeft: '22px' }}>
              <Input
                label="Invoice ID"
                type="number"
                placeHolderText="Invoice ID"
                text={id.toString()}
                onChange={(e) => setId(Number(e))}
                style={{ marginBottom: '10px' }}
              />
              <Button
                disabled={!id}
                style={{ width: '100%', marginTop: '20px' }}
                type="primary"
                onClick={() => setOpenInvoice(true)}
              >
                Open Invoice
              </Button>
            </div>
          </Col>
          <Col span={12}>
            <span>Justin Saynor (William A/c)</span>
            <pre>29540427</pre>
            <br />
            <span>Stéphane SAUVADÉ (sowojo8937 A/c)</span>
            <pre>29571174</pre>
            <pre>29574480</pre>
            <pre>29574864</pre>
            <br />
          </Col>
        </Row>
      </Card>
    </Layout>
  ) : (
    <EditInvoice id={id} onModalBackPress={() => setOpenInvoice(false)} />
  )
}

export default Index
