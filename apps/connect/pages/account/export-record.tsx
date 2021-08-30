import { Alert, Modal, Radio, Space } from 'antd'
import React, { useContext, useState } from 'react'
import ConnectLayout from '../../components/ConnectLayout/ConnectLayout'
import styles from './export-record.module.less'
import { useTranslation } from 'react-i18next'
import { ClientContext } from '../../components/UserContext/context/ClientContext'

export const ExportRecord = () => {
  const [secitons, setSections] = useState('allergies')
  const [format, setFormat] = useState('pdf')
  const { t } = useTranslation('connect')
  const clientContext = useContext(ClientContext)

  const onExport = () => {
    console.log('onExport')
  }

  const onCancel = () => {
    console.log('onCancel')
  }

  return (
    <ConnectLayout clientContext={clientContext}>
      <Modal
        visible={true}
        title={t('account.export-record')}
        okText={'Export'}
        cancelText={'Cancel'}
        onOk={onExport}
        onCancel={onCancel}
        width={600}
        bodyStyle={{ paddingBottom: 0 }}
      >
        <div className={styles.content}>
          <Alert
            message={
              <>
                {t('account.export-record.warning')}{' '}
                <a href="/">
                  {t('account.export-record.the-term-and-conditions')}
                </a>
              </>
            }
            type="info"
            style={{ marginBottom: 10 }}
          />
          <div className={styles.radioGroup}>
            <p>Select section to export</p>
            <Radio.Group
              onChange={(w) => setSections(w.target.value)}
              value={secitons}
            >
              <Space direction="vertical">
                <Radio value={'all'}>All</Radio>
                <Radio value={'allergies'}>Allergies</Radio>
                <Radio value={'medications'}>Medications</Radio>
                <Radio value={'immunisations'}>Immunisations</Radio>
                <Radio value={'test_results'}>Test results</Radio>
              </Space>
            </Radio.Group>
          </div>
          <div className={styles.radioGroup}>
            <p>Select export format</p>
            <Radio.Group
              onChange={(w) => setFormat(w.target.value)}
              value={format}
            >
              <Space direction="vertical">
                <Radio value={'pdf'}>PDF</Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>
      </Modal>
    </ConnectLayout>
  )
}

export default ExportRecord
