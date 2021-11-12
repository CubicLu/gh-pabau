import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { createPortal } from 'react-dom'
import {
  PlusOutlined,
  MailOutlined,
  PhoneOutlined,
  EditOutlined,
  DeleteOutlined,
  FieldNumberOutlined,
  CheckOutlined,
  DownOutlined,
  AlignLeftOutlined,
  GlobalOutlined,
  MessageOutlined,
} from '@ant-design/icons'
import { Tooltip, Popover } from 'antd'
import { Button, InlineEditDataTypes, CategoryFieldType } from '@pabau/ui'
import { ReactComponent as CustomDateOutlined } from '../../assets/images/custom-date.svg'
import { ReactComponent as DragAreaOutlined } from '../../assets/images/drag-area.svg'
import { ReactComponent as SingleLine } from '../../assets/images/single-line.svg'
import { ReactComponent as RadioIcon } from '../../assets/images/radio-button.svg'
import styles from './CustomizeFields.module.less'

const dragEl =
  typeof document !== 'undefined' && document.querySelector('#draggable')

enum FieldType {
  patientId,
  referredBy,
  dob,
  gender,
  address,
  mobile,
  email,
  priceList,
  membershipNumber,
}

export interface CustomizeFieldsProps {
  defaultOrder: CategoryFieldType[]
  onChange: (order) => void
  onCancel: () => void
}

export const CustomizeFields: FC<CustomizeFieldsProps> = ({
  defaultOrder,
  onCancel,
  onChange,
}) => {
  const { t } = useTranslation('common')
  const [fieldOrder, setFieldOrder] = useState<CategoryFieldType[]>([])
  const optionalPortal = (styles, element) => {
    if (styles.position === 'fixed' && dragEl) {
      return createPortal(element, dragEl)
    }
    return element
  }

  useEffect(() => {
    setFieldOrder(defaultOrder)
  }, [defaultOrder])

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list]
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    const items = reorder(
      fieldOrder,
      result.source.index,
      result.destination.index
    )

    // setFieldOrder(items)
  }

  const addFieldPop = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button>Single Line Text</Button>
      <Button>Paragraph Text</Button>
      <Button>Number</Button>
      <Button>Multiple Choice</Button>
      <Button>Single Choice</Button>
      <Button>Dropdown</Button>
      <Button>Date</Button>
      <Button>Email</Button>
      <Button>Phone</Button>
      <Button>URL</Button>
      <Button>Localized Message</Button>
    </div>
  )

  return (
    <>
      {fieldOrder.map((data, index) => {
        return (
          <div key={data.id} className={styles.customizeFieldsContainer}>
            <div className={styles.header}>
              <div className={styles.title}>{data.category}</div>
              {index === 0 && (
                <div className={styles.customize}>
                  {t('ui.clientdetails.customise')}
                </div>
              )}
            </div>
            <div className={styles.body}>
              <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={styles.draggingItemList}
                    >
                      {data.fields.map((item, index) => (
                        <Draggable
                          key={`draggable-item-${index}`}
                          draggableId={`draggable-item-${index}`}
                          index={index}
                        >
                          {(provided, snapshot) =>
                            optionalPortal(
                              provided.draggableProps.style,
                              <div
                                className={styles.draggingItemContainer}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                style={provided.draggableProps.style}
                              >
                                <div className={styles.draggingItemBody}>
                                  <div>
                                    <div className={styles.fieldType}>
                                      {item.type ===
                                        InlineEditDataTypes.string && (
                                        <SingleLine />
                                      )}
                                      {(item.type ===
                                        InlineEditDataTypes.text ||
                                        item.type ===
                                          InlineEditDataTypes.address) && (
                                        <AlignLeftOutlined />
                                      )}
                                      {item.type ===
                                        InlineEditDataTypes.date && (
                                        <CustomDateOutlined />
                                      )}
                                      {(item.type ===
                                        InlineEditDataTypes.phone ||
                                        item.type ===
                                          InlineEditDataTypes.basicPhone) && (
                                        <PhoneOutlined />
                                      )}
                                      {item.type ===
                                        InlineEditDataTypes.email && (
                                        <MailOutlined />
                                      )}
                                      {item.type ===
                                        InlineEditDataTypes.list && (
                                        <DownOutlined />
                                      )}
                                      {item.type ===
                                        InlineEditDataTypes.multiple && (
                                        <CheckOutlined />
                                      )}
                                      {item.type ===
                                        InlineEditDataTypes.bool && (
                                        <RadioIcon />
                                      )}
                                      {item.type ===
                                        InlineEditDataTypes.number && (
                                        <FieldNumberOutlined />
                                      )}
                                      {item.type ===
                                        InlineEditDataTypes.url && (
                                        <GlobalOutlined />
                                      )}
                                      {item.type ===
                                        InlineEditDataTypes.localizedMessage && (
                                        <MessageOutlined />
                                      )}
                                    </div>
                                    <div className={styles.fieldTitle}>
                                      {item.title}
                                    </div>
                                  </div>
                                  <div>
                                    {item.fieldName.includes(
                                      'customField_'
                                    ) && (
                                      <div className={styles.deleteField}>
                                        <Tooltip
                                          title={t(
                                            'ui.clientdetails.customise.delete.message'
                                          )}
                                          placement="bottom"
                                          overlayStyle={{ maxWidth: '200px' }}
                                        >
                                          <DeleteOutlined />
                                        </Tooltip>
                                      </div>
                                    )}
                                    <div className={styles.editField}>
                                      <EditOutlined />
                                    </div>
                                    <div
                                      className={styles.dragAreaContainer}
                                      {...provided.dragHandleProps}
                                    >
                                      <Tooltip
                                        title={t(
                                          'ui.clientdetails.customise.dragto'
                                        )}
                                      >
                                        <DragAreaOutlined />
                                      </Tooltip>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          }
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
            <div className={styles.footer}>
              <div className={styles.addNewField}>
                <Popover
                  placement="right"
                  title=""
                  content={addFieldPop}
                  trigger="click"
                >
                  <PlusOutlined /> {t('ui.clientdetails.customise.addnew')}
                </Popover>
              </div>
              <div className={styles.saveButtonContainer}>
                <Button type="primary" onClick={() => onChange(fieldOrder)}>
                  {t('ui.clientdetails.customise.done')}
                </Button>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
