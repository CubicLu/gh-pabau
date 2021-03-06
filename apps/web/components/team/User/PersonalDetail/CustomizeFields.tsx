import { CloseOutlined, PlusOutlined, UpOutlined } from '@ant-design/icons'
import { Button } from '@pabau/ui'
import React, { FC, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { ReactComponent as Customize } from '../../../../assets/images/customize.svg'
import { customFieldsProps } from '../Index'
import styles from '../UserDetail.module.less'

interface customizeFieldsProps {
  field: customFieldsProps[]
  handleSaveCustomFields: (field: customFieldsProps[]) => void
  handleCloseModal: () => void
  isMobile?: boolean
}

const CustomizeFields: FC<customizeFieldsProps> = ({
  field,
  handleSaveCustomFields,
  handleCloseModal,
  isMobile,
}) => {
  const [fieldData, setFieldData] = useState<customFieldsProps[]>(field)

  const getListStyle = (isDraggingOver) => ({
    padding: isMobile && '0 20px',
  })

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    margin: `0 0 ${8}px 0`,
    background: isDragging ? 'white' : '',
    boxShadow: isDragging ? '-1px 6px 13px rgba(204, 204, 204, 0.8)' : '',
    color: isDragging ? '#3D3D46' : '#737387',
    ...draggableStyle,
  })

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }
    const data = [...fieldData]
    const [removed] = data.splice(result.source.index, 1)
    data.splice(result.destination.index, 0, removed)
    setFieldData(data)
  }

  const handleClose = (id: string) => {
    const fields = fieldData.filter((data) => data.id !== id)
    setFieldData(fields)
  }

  const handleSave = () => {
    handleSaveCustomFields(fieldData)
    handleCloseModal()
  }

  return (
    <div className={styles.customFieldsWrapper}>
      {isMobile && <h2>Customize fields for all employees</h2>}
      <h4>Drag to reorder information on the Personal Tab</h4>
      <div className={styles.customFieldContent}>
        <div className={styles.customFieldsBasicInfo}>
          <p>Basic Information</p>
          <UpOutlined />
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {fieldData.length > 0 &&
                  fieldData.map((data, index) => {
                    return (
                      <Draggable
                        key={data.id}
                        draggableId={data.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                            className={styles.customFieldsDraggable}
                          >
                            <div
                              key={data.id}
                              className={styles.customFieldsDraggableBox}
                            >
                              <div className={styles.dragIconName}>
                                <Customize /> <span>{data.label}</span>
                              </div>
                              {data.name !== 'firstname' &&
                                data.name !== 'lastname' &&
                                data.name !== 'email' && (
                                  <div
                                    className={styles.dragClose}
                                    onClick={() => handleClose(data.id)}
                                  >
                                    <CloseOutlined />
                                  </div>
                                )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    )
                  })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className={styles.customFieldsDragAdd}>
          <Button className={styles.addFields}>
            <PlusOutlined />
            Add Fields
          </Button>
        </div>
        <div className={styles.customFieldsDragSave}>
          <Button
            className={styles.dragSave}
            type={'primary'}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CustomizeFields
