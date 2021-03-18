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

const ADD_MUTATION = gql`
  mutation insert_drugs(
    $is_active: Boolean = false
    $name: String
    $route: String
    $frequency: String
    $unit: String
    $dosage: String
    $comment: String
  ) {
    insert_drugs_one(
      object: {
        comment: $comment
        dosage: $dosage
        frequency: $frequency
        is_active: $is_active
        name: $name
        route: $route
        unit: $unit
      }
    ) {
      __typename
      id
    }
  }
`

const EDIT_MUTATION = gql`
  mutation update_drugs_by_pk(
    $id: uuid!
    $is_active: Boolean
    $name: String
    $route: String
    $unit: String
    $frequency: String
    $dosage: String
    $comment: String
  ) {
    update_drugs_by_pk(
      pk_columns: { id: $id }
      _set: {
        is_active: $is_active
        name: $name
        route: $route
        unit: $unit
        frequency: $frequency
        dosage: $dosage
        comment: $comment
      }
    ) {
      __typename
      id
    }
  }
`

const DELETE_MUTATION = gql`
  mutation delete_drugs_by_pk($id: uuid!) {
    delete_drugs_by_pk(id: $id) {
      __typename
      id
    }
  }
`
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
const LIST_AGGREGATE_QUERY = gql`
  query marketing_source_aggregate($searchTerm: String = "") {
    marketing_source_aggregate(
      where: { _or: [{ _and: [{ name: { _ilike: $searchTerm } }] }] }
    ) {
      aggregate {
        count
      }
    }
  }
`

/**
 * TODO refactor UPDATE_ORDER_MUTATION with legacy db
 */
const UPDATE_ORDER_MUTATION = gql`
  mutation update_marketing_source_order($id: uuid!, $order: Int) {
    update_marketing_source(
      where: { id: { _eq: $id } }
      _set: { order: $order }
    ) {
      affected_rows
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
      addQuery={ADD_MUTATION}
      deleteQuery={DELETE_MUTATION}
      listQuery={LIST_QUERY}
      editQuery={EDIT_MUTATION}
      aggregateQuery={LIST_AGGREGATE_QUERY}
      updateOrderQuery={UPDATE_ORDER_MUTATION}
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
