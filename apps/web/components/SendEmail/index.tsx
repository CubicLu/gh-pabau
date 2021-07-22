import React, { FC, useState, useEffect } from 'react'
// import { SendMail as PabauSendMail } from '@pabau/ui'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { Skeleton } from 'antd'
import {
  Notification,
  NotificationType,
  SimpleDropdown,
  InputHtmlWithTags,
} from '@pabau/ui'
import {
  SendEmailDataDocument,
  SendEmailWithTagsDocument,
  EmailReceiverDocument,
} from '@pabau/graphql'
import { Formik } from 'formik'
import { Form, Input, SubmitButton } from 'formik-antd'
import { useMutation } from '@apollo/client'

export const SendMail: FC = () => {
  const router = useRouter()
  const [contactID, setContactID] = useState(0)
  const [leadID, setLeadID] = useState(0)
  const [staffID, setStaffID] = useState(0)
  const [content, setContent] = useState('')
  //   const [forms, setForms] = useState(null)
  //   const [senders, setSenders] = useState(null)
  //   const [subject, setSubject] = useState('')

  console.info('router:', router, router.query)

  useEffect(() => {
    if (router.query.client_id) {
      setContactID(Number(router.query.client_id))
    }

    if (router.query.lead_id) {
      setLeadID(Number(router.query.lead_id))
    }

    if (router.query.stuff_id) {
      setStaffID(Number(router.query.stuff_id))
    }
  }, [router.query])

  const { data, loading: init } = useQuery(SendEmailDataDocument)

  const { data: receiverData, loading } = useQuery(EmailReceiverDocument, {
    variables: {
      contactID: contactID,
      leadID: leadID,
      userID: staffID,
    },
  })

  if (!init) {
    console.info('Ful Data Loaded:', data)
  }

  if (!loading) {
    console.info('Receiver Loaded:', receiverData)
  }

  const [sendEmailMutation] = useMutation(SendEmailWithTagsDocument, {
    onCompleted() {
      Notification(NotificationType.success, 'Email Sent')
    },
    onError() {
      Notification(NotificationType.error, 'Email Not Sent')
    },
  })

  const onTextWithTagChange = (e) => {
    setContent(e)
  }

  return (
    <div
      style={{
        width: '752px',
        height: '824px',
        border: '1px solid var(--border-color-base)',
        marginLeft: '25%',
      }}
    >
      {loading && init ? (
        <Skeleton active={true} paragraph={{ rows: 20 }} />
      ) : (
        // <PabauSendMail
        //   receiverData={'viktor@pabau.com'}
        //   client={{
        //     id: '123456',
        //     name: 'Ljubica',
        //     email: 'kostova1@pabau.com',
        //   }}
        // />

        <div style={{ margin: '5%' }}>
          <h1>Send Email Test</h1>
          <Formik
            enableReinitialize={true}
            initialValues={{
              to_email:
                receiverData?.contact?.Email ||
                receiverData?.lead?.Email ||
                receiverData?.user?.Email ||
                '',
              senders:
                data?.senders?.length > 0
                  ? data?.senders[0]?.senders_name +
                    ' <' +
                    data?.senders[0]?.company_email +
                    '>'
                  : '',
              subject: 'Test Subject',
            }}
            onSubmit={async (values) => {
              console.info('Values on Submit:', values, contactID)
              await sendEmailMutation({
                variables: {
                  to: values.to_email,
                  subject: values.subject,
                  text: content,
                  html: content,
                  contact_id: receiverData?.contact?.ID,
                  lead_id: receiverData?.lead?.ID,
                  staff_id: receiverData?.user?.id,
                },
                optimisticResponse: {},
              })
            }}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <div>
                  <div style={{ margin: '1%' }}>
                    To
                    <Input
                      name="to_email"
                      type="email"
                      placeholder="To Email"
                    />
                  </div>
                  <div style={{ margin: '1%' }}>
                    From
                    <SimpleDropdown
                      name="senders"
                      dropdownItems={
                        data?.senders.length > 0
                          ? ([
                              ...new Set(
                                data?.senders.map(
                                  (item) =>
                                    item.senders_name +
                                    ' <' +
                                    item.company_email +
                                    '>'
                                )
                              ),
                            ].filter((item) => item !== undefined) as string[])
                          : []
                      }
                      onSelected={(val) => setFieldValue('senders', val)}
                      value={values.senders}
                    />
                  </div>
                  <div style={{ margin: '1%' }}>
                    Subject
                    <Input
                      name="subject"
                      type="text"
                      placeholder="Subject"
                      size="large"
                    />
                  </div>
                  <div style={{ height: 460 }}>
                    <InputHtmlWithTags
                      value={''}
                      placeholder={''}
                      valueWithTag={''}
                      disabledTags={[
                        'appointments',
                        'opportunity',
                        'invoice',
                        'giftvoucher',
                        'quickbook',
                        'connect',
                        'forms',
                        'customfields',
                        contactID === 0 ? 'clients' : '',
                        leadID === 0 ? 'leads' : '',
                      ]}
                      onChange={onTextWithTagChange}
                    />
                  </div>
                </div>
                <SubmitButton type={'primary'} htmlType="submit" block>
                  Send
                </SubmitButton>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  )
}

export default SendMail
