import React, { FC, ReactNode } from 'react'
import { Breadcrumb } from '@pabau/ui'
import CrudLayout from '../../../components/CrudLayout/CrudLayout'
import { gql } from '@apollo/client'
import ProcessingIcon from './assets/ProcessingIcon'
import SendIcon from './assets/SendIcon'
import notificationImage from '../../../assets/images/Illustration.svg'
import styles from './index.module.less'

const notificationDescription = `We noticed that you are processing lab results, however have not
setup integration for “UD Labs”. To receive these automatically.
Just have your lab provider send those results to
labs+482@pabau.com, and then you can automatically match the results
against the patient.`
const notificationTitle = 'Integrate your Lab'

const LIST_QUERY = gql`
  query labs_dashboard($limit: Int = 1) {
    labs_dashboard(limit: $limit) {
      lab
      labNo
      client
      test
      requested
      requester
      lastUpdate
      public
    }
  }
`
const schema: Schema = {
  full: 'Tablesheet',
  fullLower: 'tablesheet',
  short: 'Labs',
  shortLower: 'labs',
  draggable: false,
  inboxButton: true,
  messages: {
    create: {
      success: 'New lab created.',
      error: 'While creating lab.',
    },
    update: {
      success: 'Lab updated.',
      error: 'While updating lab.',
    },
    delete: {
      success: 'Lab deleted.',
      error: 'While deleting labs.',
    },
  },
  deleteBtnLabel: 'Yes, Delete Source',
  fields: {
    checkBox: {
      short: '',
      shortLower: '',
      cssWidth: '5em',
    },
    labNo: {
      short: 'Lab No',
      shortLower: 'lab no',
    },
    client: {
      short: 'Client',
      shortLower: 'client',
    },
    test: {
      short: 'Test',
      shortLower: 'test',
    },
    requested: {
      short: 'Requested',
      shortLower: 'requested',
    },
    lastUpdate: {
      short: 'Last Update',
      shortLower: 'last update',
    },
    lab: {
      short: 'Lab',
      shortLower: 'lab',
    },
    requester: {
      short: 'Requester',
      shortLower: 'requester',
    },
    public: {
      full: 'Status',
      type: 'number',
      defaultvalue: 1,
    },
  },
  notification: {
    title: notificationTitle,
    description: notificationDescription,
    imgPath: notificationImage,
  },
  breadScrumbs: [
    { breadcrumbName: 'Labs', path: 'labs' },
    { breadcrumbName: 'Dashboard', path: '' },
  ],
}

interface TitleCard {
  title: string
  subTitle: string
  className?: string
  icon: ReactNode
}
const Tab: FC<TitleCard> = ({ title, subTitle, className, icon }) => {
  return (
    <div className={styles.tab}>
      <div className={className}>{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{subTitle}</p>
      </div>
    </div>
  )
}

export const Index: FC = () => {
  return (
    <CrudLayout
      schema={schema}
      addQuery={null}
      deleteQuery={null}
      listQuery={LIST_QUERY}
      editQuery={null}
      aggregateQuery={null}
      updateOrderQuery={null}
    >
      <div className={styles.labsDashboard}>
        <div className={styles.labsDashboardCard}>
          <div className={styles.cardHeader}>
            <div>
              <div className={styles.breadScrumb}>
                <Breadcrumb breadcrumbItems={schema.breadScrumbs} />
              </div>
              <div className={styles.cardTitle}>
                <h1>{schema.short}</h1>
              </div>
            </div>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.tabs}>
              <Tab
                title="12345"
                subTitle="PROCESSING"
                className="processing"
                icon={<ProcessingIcon />}
              />
              <Tab
                title="12345"
                subTitle="REQUESTED"
                className="requested"
                icon={<SendIcon />}
              />
              <Tab
                title="12345"
                subTitle="RECEIVED"
                className="received"
                icon={<SendIcon />}
              />
              <Tab
                title="12345"
                subTitle="SENT"
                className="sent"
                icon={<SendIcon />}
              />
            </div>
          </div>
        </div>
      </div>
    </CrudLayout>
  )
}

export default Index
