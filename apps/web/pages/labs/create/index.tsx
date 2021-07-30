import React, { FC, useContext } from 'react'
import {
  Breadcrumb,
  Button,
  PhoneNumberInput,
  Notification,
  NotificationType,
} from '@pabau/ui'
import Layout from '../../../components/Layout/Layout'
import MobileHeader from '../../../components/MobileHeader'
import useWindowSize from '../../../hooks/useWindowSize'
import { UserContext } from '../../../context/UserContext'
import { Typography } from 'antd'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Form, Input, SubmitButton, Checkbox } from 'formik-antd'
import { useRouter } from 'next/router'
import { gql, useMutation } from '@apollo/client'
import styles from './index.module.less'
const { Title } = Typography

const ADD_MUTATION = gql`
  mutation insert_Labs_one(
    $city: String
    $country: String
    $email: String!
    $isActive: Boolean
    $name: String!
    $phone: String!
    $postalCode: numeric
    $providerNumber: numeric
    $street: String
    $street2: String
  ) {
    insert_LabsTmp_one(
      object: {
        city: $city
        country: $country
        email: $email
        is_active: $isActive
        name: $name
        phone: $phone
        postal_code: $postalCode
        provider_number: $providerNumber
        street: $street
        street2: $street2
      }
    ) {
      id
    }
  }
`
export interface CreateLabFormProps {
  name: string
  providerNumber: number
  phone: string
  email: string
  country: string
  city: string
  street: string
  street2: string
  postalCode: number
  isActive: boolean
}

export const Index: FC = () => {
  const router = useRouter()
  const user = useContext(UserContext)
  const size = useWindowSize()
  const [addMutation] = useMutation(ADD_MUTATION, {
    onCompleted(data) {
      Notification(
        NotificationType.success,
        `Success! You have successfully created a lab`
      )
    },
    onError(err) {
      Notification(NotificationType.error, `Error! While creating a lab`)
    },
  })

  const formikInitialValues = {
    name: '',
    providerNumber: null,
    phone: '',
    email: '',
    country: null,
    city: null,
    street: null,
    street2: null,
    postalCode: null,
    isActive: true,
  }

  const formikValidationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Please enter valid email id')
      .required('Email is required'),
    providerNumber: Yup.number()
      .required('Provider No is required')
      .positive()
      .integer(),
    phone: Yup.string().required('phone is required'),
  })

  const renderForm = (setFieldValue) => {
    return (
      <div className={styles.formDiv}>
        <div className={styles.basicInfo}>
          <h6>Basic information</h6>
          <div className={styles.infoList}>
            <Form.Item className={styles.listing} label="Name" name="name">
              <Input name="name" autoComplete="off" placeholder="eg Biolabs" />
            </Form.Item>
            <Form.Item
              className={styles.listing}
              label="Provider No"
              name="providerNumber"
            >
              <Input
                name="providerNumber"
                type="number"
                placeholder="eg 1234"
              />
            </Form.Item>
          </div>
          <div className={styles.infoList}>
            <Form.Item className={styles.listing} name={'phone'}>
              <PhoneNumberInput
                label="Phone"
                onChange={(value) => setFieldValue('phone', value)}
              />
            </Form.Item>
            <Form.Item className={styles.listing} label="Email" name="email">
              <Input
                name="email"
                autoComplete="off"
                placeholder="email@company.com"
              />
            </Form.Item>
          </div>
        </div>
        <div className={styles.basicInfo}>
          <h6>Address information</h6>
          <div className={styles.infoList}>
            <Form.Item
              className={styles.listing}
              label="Country"
              name="country"
            >
              <Input name="country" autoComplete="off" />
            </Form.Item>
          </div>
          <div className={styles.infoList}>
            <Form.Item className={styles.listing} label="City" name="city">
              <Input name="city" autoComplete="off" />
            </Form.Item>
          </div>
          <div className={styles.infoList}>
            <Form.Item className={styles.listing} label="Street" name="street">
              <Input name="street" autoComplete="off" />
            </Form.Item>
          </div>
          <div className={styles.infoList}>
            <Form.Item
              className={styles.listing}
              label="Street2"
              name="street2"
            >
              <Input name="street2" autoComplete="off" />
            </Form.Item>
          </div>
          <div className={styles.infoList}>
            <Form.Item
              className={styles.listing}
              label="Postal Code"
              name="postalCode"
            >
              <Input type="number" name="postalCode" autoComplete="off" />
            </Form.Item>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Layout active={'Lab'} {...user}>
      <div className={styles.labWrapper}>
        <Formik
          initialValues={formikInitialValues}
          validationSchema={formikValidationSchema}
          onSubmit={async (values: CreateLabFormProps) => {
            await addMutation({
              variables: values,
              optimisticResponse: {},
            })
            router.push('/setup/labs')
          }}
        >
          {({ setFieldValue }) => (
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              layout="vertical"
            >
              <MobileHeader title="Create Lab" parent="/setup/labs">
                <div className={styles.createHeaderWrapper}>
                  <div className={styles.creatRight}>
                    <Checkbox name="isActive" className={styles.checkActivate}>
                      Active
                    </Checkbox>
                  </div>
                </div>
              </MobileHeader>
              {size.width > 767 && (
                <div className={styles.createHeaderWrapper}>
                  <div className={styles.creatHead}>
                    <div className={styles.headBreadTitle}>
                      <Breadcrumb
                        items={[
                          { breadcrumbName: 'Setup', path: 'setup' },
                          { breadcrumbName: 'Labs', path: 'setup/labs' },
                          { breadcrumbName: 'Create Lab', path: '' },
                        ]}
                      />
                      <Title>Create Lab</Title>
                    </div>
                    <div className={styles.creatRight}>
                      <Checkbox
                        name="isActive"
                        className={styles.checkActivate}
                      >
                        Active
                      </Checkbox>
                      <Button
                        className={styles.cancelBtn}
                        onClick={() => router.push('/setup/labs')}
                      >
                        Cancel
                      </Button>
                      <SubmitButton className={styles.createBtn} type="primary">
                        Create Lab
                      </SubmitButton>
                    </div>
                  </div>
                </div>
              )}
              {renderForm(setFieldValue)}
              {size.width < 768 && (
                <div className={styles.footer}>
                  <Button
                    className={styles.cancelBtn}
                    onClick={() => router.push('/setup/labs')}
                  >
                    Cancel
                  </Button>
                  <SubmitButton className={styles.createBtn} type="primary">
                    Create Lab
                  </SubmitButton>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  )
}

export default Index
