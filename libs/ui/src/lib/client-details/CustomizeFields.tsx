import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import {
  PlusOutlined,
  EditOutlined,
  FontColorsOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons'
import { Tooltip } from 'antd'
import { Button } from '@pabau/ui'
import { ReactComponent as CustomDateOutlined } from '../../assets/images/custom-date.svg'
import { ReactComponent as DragAreaOutlined } from '../../assets/images/drag-area.svg'
import styles from './CustomizeFields.module.less'

type FieldType =
  | 'patientId'
  | 'referredBy'
  | 'dob'
  | 'gender'
  | 'address'
  | 'mobile'
  | 'email'
interface FieldOrderItem {
  title: string
  fieldName: string
  type: string
  field: FieldType
}

export interface CustomizeFieldsProps {
  defaultOrder: FieldOrderItem[]
  onChange: (order: FieldOrderItem[]) => void
  onCancel: () => void
}

export const CustomizeFields: FC<CustomizeFieldsProps> = ({
  defaultOrder,
  onCancel,
  onChange,
}) => {
  const { t } = useTranslation('common')
  const [fieldOrder, setFieldOrder] = useState<FieldOrderItem[]>([])
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

    setFieldOrder(items)
  }

  return (
    <div className={styles.customizeFieldsContainer}>
      <div className={styles.header}>
        <div className={styles.title}>{t('ui.clientdetails.details')}</div>
        <div className={styles.customize} onClick={() => onCancel()}>
          <EditOutlined />
          {t('ui.clientdetails.customise')}
        </div>
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
                {fieldOrder.map((item, index) => (
                  <Draggable
                    key={`draggable-item-${index}`}
                    draggableId={`draggable-item-${index}`}
                    index={index}
                  >
                    {(provided, snapshot) => {
                      if (snapshot.isDragging) {
                        provided.draggableProps.style.left =
                          provided.draggableProps.style.offsetLeft
                        provided.draggableProps.style.top =
                          provided.draggableProps.style.offsetTop
                      }
                      return (
                        <div
                          className={styles.draggingItemContainer}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={provided.draggableProps.style}
                        >
                          <div className={styles.draggingItemBody}>
                            <div>
                              <div className={styles.fieldType}>
                                {item.type === 'text' && <FontColorsOutlined />}
                                {item.type === 'date' && <CustomDateOutlined />}
                                {item.type === 'phone' && <PhoneOutlined />}
                                {item.type === 'email' && <MailOutlined />}
                              </div>
                              <div className={styles.fieldTitle}>
                                {item.title}
                              </div>
                            </div>
                            <div
                              className={styles.dragAreaContainer}
                              {...provided.dragHandleProps}
                            >
                              <Tooltip title="Drag to rearrange">
                                <DragAreaOutlined />
                              </Tooltip>
                            </div>
                          </div>
                          {(item.type === 'phone' || item.type === 'email') && (
                            <div className={styles.draggingItemDescription}>
                              Appears in create client screen
                            </div>
                          )}
                        </div>
                      )
                    }}
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
          <PlusOutlined /> Add a new field
        </div>
        <div className={styles.saveButtonContainer}>
          <Button type="primary" onClick={() => onChange(fieldOrder)}>
            Done
          </Button>
        </div>
      </div>
    </div>
  )
}
