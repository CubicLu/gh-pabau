import Form from './Form'
import React, { FC, useEffect, useState } from 'react'
import { BasicModal as Modal, Notification, NotificationType } from '@pabau/ui'
import { DocumentNode, useMutation } from '@apollo/client'
import { useFormikContext } from 'formik'
import { Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useTranslationI18 } from '../hooks/useTranslationI18'

interface P {
  schema: Schema
  addQuery?: DocumentNode
  deleteQuery?: DocumentNode
  listQuery: DocumentNode
  editingRow?: Record<string, string | boolean | number>
  needTranslation?: boolean
  onClose?: () => void
  listQueryVariables: any
  aggregateQuery?: DocumentNode
  aggregateQueryVariables?: any
}

const CrudModal: FC<P> = ({
  schema,
  deleteQuery,
  listQuery,
  listQueryVariables,
  onClose,
  editingRow,
  aggregateQuery,
  aggregateQueryVariables,
}) => {
  const [openDeleteModal, setDeleteModal] = useState(false)
  const { t } = useTranslationI18()
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
    schemaForm.fields[schema?.filter?.primary?.name] ??
    schemaForm.fields['is_active']
  delete schemaForm.fields['is_active']
  delete schemaForm.fields[schema?.filter?.primary?.name]
  delete schemaForm.fields['company_id']
  const [specialBoolean, setSpecialBoolean] = useState<boolean>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    schema?.filter?.primary?.name
      ? (editingRow?.id &&
          editingRow?.[schema?.filter?.primary?.name?.toString()]) ??
          (typeof specialFormElement?.defaultvalue === 'boolean' &&
            specialFormElement.defaultvalue) ??
          true
      : (editingRow?.id && editingRow?.is_active) ?? //TODO remove this later on when no pages have hardcoded is_active
          (typeof specialFormElement?.defaultvalue === 'boolean' &&
            specialFormElement.defaultvalue) ??
          true
  )

  useEffect(() => {
    setSpecialBoolean(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      schema?.filter?.primary?.name
        ? (editingRow?.id &&
            editingRow?.[schema?.filter?.primary?.name?.toString()]) ??
            (typeof specialFormElement?.defaultvalue === 'boolean' &&
              specialFormElement.defaultvalue) ??
            true
        : (editingRow?.id && editingRow?.is_active) ?? //TODO remove this later on when no pages have hardcoded is_active
            (typeof specialFormElement?.defaultvalue === 'boolean' &&
              specialFormElement.defaultvalue) ??
            true
    )
  }, [editingRow, schema?.filter?.primary?.name, specialFormElement])

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
          const { id } = editingRow
          await deleteMutation({
            variables: { id },
            optimisticResponse: {},
            refetchQueries: [
              {
                query: listQuery,
                ...listQueryVariables,
              },
              {
                query: aggregateQuery,
                ...aggregateQueryVariables(),
              },
            ],
          })
          setDeleteModal(false)
          onClose?.()
        }}
        visible={openDeleteModal}
        title={schema.deleteModalHeader || `Delete ${schema.short}?`}
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
          {t('common-label-delete-warning')}
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
              {schema.createModalHeader
                ? schema.createModalHeader
                : `Create ${schema.full}`}
              {schema.tooltip && (
                <Tooltip placement="top" title={schema.tooltip}>
                  <QuestionCircleOutlined
                    style={{ marginLeft: 10, fontSize: 16 }}
                  />
                </Tooltip>
              )}
            </span>
          ) : schema.editModalHeader ? (
            schema.editModalHeader
          ) : (
            `Edit ${schema.full}`
          )
        }
        newButtonText={
          typeof editingRow === 'object' && editingRow?.isCreate
            ? t('common-label-create')
            : t('common-label-save')
        }
        dangerButtonText={editingRow?.id && t('common-label-delete')}
        specialBooleanLabel={
          !!specialFormElement && t('marketingsource-status-label')
        }
        specialBooleanValue={specialBoolean}
        onSpecialBooleanClick={() => {
          setSpecialBoolean((e) => e)
          schema?.filter?.primary?.name
            ? formik.setFieldValue(
                schema?.filter?.primary?.name?.toString(),
                !specialBoolean
              )
            : formik.setFieldValue('is_active', !specialBoolean) //TODO remove this later on when no pages have hardcoded is_active
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
