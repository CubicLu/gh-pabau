import Form from './Form'
import React, { FC, useEffect, useState } from 'react'
import { BasicModal as Modal, Notification, NotificationType } from '@pabau/ui'
import { DocumentNode, useMutation } from '@apollo/client'
import { useFormikContext } from 'formik'
import { Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

interface P {
  schema: Schema
  addQuery?: DocumentNode
  deleteQuery?: DocumentNode
  listQuery: DocumentNode
  editingRow?: Record<string, string | boolean | number>
  onClose?: () => void
}

const CrudModal: FC<P> = ({
  schema,
  deleteQuery,
  listQuery,
  onClose,
  editingRow,
}) => {
  const [openDeleteModal, setDeleteModal] = useState(false)
  const [deleteMutation] = useMutation(deleteQuery, {
    onCompleted() {
      Notification(
        NotificationType.success,
        `Success! ${schema.messages.delete.success}`
      )
    },
    onError() {
      Notification(
        NotificationType.error,
        `Error! ${schema.messages.delete.error}`
      )
    },
  })
  const formik = useFormikContext<unknown>()

  const schemaForm = { ...schema, fields: { ...schema.fields } }
  const specialFormElement =
    schemaForm.fields['is_active'] ||
    schemaForm.fields['public'] ||
    schemaForm.fields['isActive']
  delete schemaForm.fields['is_active']
  delete schemaForm.fields['public']
  delete schemaForm.fields['company_id']
  const [specialBoolean, setSpecialBoolean] = useState<boolean>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (editingRow?.id && (editingRow?.is_active || editingRow?.public)) ??
      ((typeof specialFormElement?.defaultvalue === 'boolean' ||
        typeof specialFormElement?.defaultvalue === 'number') &&
        specialFormElement.defaultvalue) ??
      true
  )

  useEffect(() => {
    setSpecialBoolean(
      (editingRow?.id && (editingRow?.is_active as boolean)) ??
        (typeof specialFormElement?.defaultvalue === 'boolean' &&
          (Boolean(specialFormElement.defaultvalue) as boolean)) ??
        true
    )
  }, [editingRow, specialFormElement])

  console.log('formik', formik)

  return (
    <>
      <Modal
        modalWidth={682}
        centered={true}
        onCancel={() => {
          setDeleteModal(false)
          onClose?.()
        }}
        onOk={async () => {
          const { id } = editingRow as { id: string }
          await deleteMutation({
            variables: { id },
            optimisticResponse: {},
            update: (cache) => {
              const existing = cache.readQuery({
                query: listQuery,
              })
              if (existing) {
                // eslint-disable-next-line @typescript-eslint/ban-types
                const key = Object.keys(existing as object)[0]
                cache.writeQuery({
                  query: listQuery,
                  data: {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    [key]: (existing[key] as Record<string, never>).filter(
                      (e) => e.id !== id
                    ),
                  },
                })
              }
            },
          })
          setDeleteModal(false)
          onClose?.()
        }}
        visible={openDeleteModal}
        title={`Delete ${schema.short}?`}
        newButtonText={schema.deleteBtnLabel || 'Yes, Delete'}
        isValidate={true}
      >
        <span
          style={{
            fontFamily: 'Circular-Std-Book',
            fontWeight: 'normal',
            fontSize: '16px',
            lineHeight: '20px',
            color: '#9292A3',
          }}
        >
          {schema.deleteDescField
            ? editingRow[schema.deleteDescField]
            : editingRow?.name}{' '}
          will be deleted. This action is irreversable
        </span>
      </Modal>
      <Modal
        modalWidth={682}
        centered={true}
        onCancel={() => {
          onClose?.()
          formik.resetForm()
        }}
        onDelete={() => setDeleteModal(true)}
        onOk={() => formik.submitForm()}
        visible={!openDeleteModal}
        title={
          typeof editingRow === 'object' && editingRow.isCreate ? (
            <span>
              {`Create ${schema.full}`}
              {schema.tooltip && (
                <Tooltip placement="top" title={schema.tooltip}>
                  <QuestionCircleOutlined
                    style={{ marginLeft: 10, fontSize: 16 }}
                  />
                </Tooltip>
              )}
            </span>
          ) : (
            `Edit ${schema.full}`
          )
        }
        newButtonText={
          typeof editingRow === 'object' && editingRow.isCreate
            ? `Create`
            : 'Save'
        }
        dangerButtonText={editingRow?.id && `Delete`}
        specialBooleanLabel={!!specialFormElement && 'Active'}
        specialBooleanValue={specialBoolean}
        onSpecialBooleanClick={() => {
          setSpecialBoolean((e) => !e)
          formik.setFieldValue('is_active', !specialBoolean)
        }}
        isValidate={
          editingRow?.isCreate ? formik.dirty && formik.isValid : formik.isValid
        }
      >
        <Form formik={formik} schema={schemaForm} />
      </Modal>
    </>
  )
}

export default CrudModal
