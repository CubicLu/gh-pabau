import React, { FC, useRef } from 'react'
import { Form } from 'formik-antd'
import { Input } from 'antd'
import { Formik } from 'formik'
import { useMutation } from '@apollo/client'
import { BasicModal as Modal, Notification, NotificationType } from '@pabau/ui'
import {
  UpdateCustomFieldGroupDocument,
  CreateCustomFieldGroupDocument,
  DeleteCustomFieldGroupDocument,
} from '@pabau/graphql'
import { useTranslationI18 } from '../../../hooks/useTranslationI18'

export interface CreateGroupsTabValueProp {
  id: number
  name: string
  noOfFields: number
}

export interface CreateGroupsTabProp {
  showModal: boolean
  closeModal?: () => void
  values?: CreateGroupsTabValueProp
}

export const CreateGroupsTab: FC<CreateGroupsTabProp> = ({
  showModal,
  closeModal,
  values = {
    name: '',
  },
}) => {
  const { t } = useTranslationI18()
  const ref = useRef(null)

  const [updateGroupMutation] = useMutation(UpdateCustomFieldGroupDocument, {
    onCompleted() {
      Notification(
        NotificationType.success,
        t('setup.custom-fields.groups.group-updated')
      )
      closeModal?.()
    },
  })

  const [createGroupMutation] = useMutation(CreateCustomFieldGroupDocument, {
    onCompleted() {
      Notification(
        NotificationType.success,
        t('setup.custom-fields.groups.group-created')
      )
      closeModal?.()
    },
  })

  const [deleteGroupMutation] = useMutation(DeleteCustomFieldGroupDocument, {
    onCompleted() {
      Notification(
        NotificationType.success,
        t('setup.custom-fields.groups.group-deleted')
      )
      closeModal?.()
    },
  })

  const handleSubmit = () => {
    const { name } = ref.current.values
    const { id } = values

    if (id) {
      updateGroupMutation({
        variables: {
          id: id,
          name: name,
        },
      })
    } else {
      createGroupMutation({
        variables: {
          data: {
            name: name,
            Company: { connect: { id: null } },
          },
        },
      })
    }
  }

  return (
    <Modal
      modalWidth={682}
      centered={true}
      onCancel={() => {
        closeModal?.()
      }}
      onDelete={() => {
        const { id } = values

        deleteGroupMutation({
          variables: {
            id: id,
          },
        })
      }}
      onOk={() => {
        const { name } = ref.current.values
        if (name) {
          handleSubmit()
        }
      }}
      newButtonText={t('setup.custom-fields.create-group.save')}
      visible={showModal}
      title={
        values?.id
          ? t('setup.custom-fields.edit-group')
          : t('setup.custom-fields.create-group')
      }
      dangerButtonText={values?.id ? t('common-label-delete') : ''}
    >
      <div style={{ margin: '10px 0px' }}>
        <Formik
          enableReinitialize={true}
          initialValues={values}
          onSubmit={() => {
            console.log('on form submit')
          }}
          innerRef={ref}
        >
          {({ setFieldValue, values }) => (
            <Form initialValues={{}} layout="vertical">
              <Form.Item
                label={t('setup.custom-fields.create-group.name')}
                name="name"
              >
                <Input
                  name="name"
                  placeholder={t(
                    'setup.custom-fields.create-group.name.placeholder'
                  )}
                  value={values ? values?.name : ''}
                  autoComplete="off"
                  onChange={(value) => {
                    setFieldValue('name', value.target.value)
                  }}
                />
              </Form.Item>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  )
}

export default CreateGroupsTab
