import { MedicalForms } from '@pabau/ui'
import React, { FC } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import LeftSidebarElement from '../medicalform/LeftSidebarElement'
import styles from './MedicalFormBuilder.module.less'
import MedicalFormLeftSidebarDivider from './MedicalFormLeftSidebarDivider'

interface P {
  medicalForms: MedicalForms[]
  handlingClickLeft: (componentName: string) => void
}

export const MedicalFormLeftSidebarBasicPanels: FC<P> = ({ ...props }) => {
  const { t } = useTranslation('common')
  const { medicalForms, handlingClickLeft } = props
  const getRenderItemBasic = () => {
    const MyChild = (provided, snapshot, rubric) => {
      const draggedForm = medicalForms.filter(
        (item) => item.formName === rubric.draggableId
      )

      return (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot?.isDragging ? true : false}
          className={snapshot?.isDragging ? styles.dndDragging : ''}
        >
          {draggedForm && (
            <LeftSidebarElement
              type="basic"
              component={draggedForm[0].formName}
              handlingClickLeft={handlingClickLeft}
            />
          )}
        </div>
      )
    }
    MyChild.displayName = 'renderItemBasic'
    return MyChild
  }

  return (
    <div>
      <Droppable
        renderClone={getRenderItemBasic()}
        droppableId="LeftSideBasic"
        isDropDisabled={true}
      >
        {(provided, snapshot) => (
          <div ref={provided.innerRef}>
            <MedicalFormLeftSidebarDivider
              title={t('ui.medicalformbuilder.medicalcomponent.basic.general')}
            />
            {medicalForms
              ?.filter(
                (form) =>
                  form.formName === 'basic_heading' ||
                  form.formName === 'basic_shortanswer' ||
                  form.formName === 'basic_longanswer' ||
                  form.formName === 'basic_textblock'
              )
              .map((form) => {
                return snapshot.draggingFromThisWith === form.formName ? (
                  <div className={styles.dndCopy} key={form.id}>
                    <LeftSidebarElement
                      type="basic"
                      component={form.formName}
                      handlingClickLeft={handlingClickLeft}
                    />
                  </div>
                ) : (
                  <Draggable
                    key={form.formName}
                    draggableId={form.formName}
                    index={form.id}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isDragging={snapshot?.isDragging ? true : false}
                        className={
                          snapshot?.isDragging ? styles.dndDragging : ''
                        }
                      >
                        <LeftSidebarElement
                          type="basic"
                          component={form.formName}
                          handlingClickLeft={handlingClickLeft}
                        />
                      </div>
                    )}
                  </Draggable>
                )
              })}
            <MedicalFormLeftSidebarDivider
              title={t('ui.medicalformbuilder.medicalcomponent.basic.choices')}
            />
            {medicalForms
              ?.filter(
                (form) =>
                  form.formName === 'basic_singlechoice' ||
                  form.formName === 'basic_multiplechoice' ||
                  form.formName === 'basic_dropdown' ||
                  form.formName === 'basic_slider'
              )
              .map((form) => {
                return snapshot.draggingFromThisWith === form.formName ? (
                  <div className={styles.dndCopy} key={form.id}>
                    <LeftSidebarElement
                      type="basic"
                      component={form.formName}
                      handlingClickLeft={handlingClickLeft}
                    />
                  </div>
                ) : (
                  <Draggable
                    key={form.formName}
                    draggableId={form.formName}
                    index={form.id}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isDragging={snapshot?.isDragging ? true : false}
                        className={
                          snapshot?.isDragging ? styles.dndDragging : ''
                        }
                      >
                        <LeftSidebarElement
                          type="basic"
                          component={form.formName}
                          handlingClickLeft={handlingClickLeft}
                        />
                      </div>
                    )}
                  </Draggable>
                )
              })}
            <MedicalFormLeftSidebarDivider
              title={t('ui.medicalformbuilder.medicalcomponent.basic.other')}
            />
            {medicalForms
              ?.filter(
                (form) =>
                  form.formName === 'basic_drawing' ||
                  form.formName === 'basic_staticimage' ||
                  form.formName === 'basic_signature' ||
                  form.formName === 'basic_photo'
              )
              .map((form) => {
                return snapshot.draggingFromThisWith === form.formName ? (
                  <div className={styles.dndCopy} key={form.id}>
                    <LeftSidebarElement
                      type="basic"
                      component={form.formName}
                      handlingClickLeft={handlingClickLeft}
                    />
                  </div>
                ) : (
                  <Draggable
                    key={form.formName}
                    draggableId={form.formName}
                    index={form.id}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isDragging={snapshot?.isDragging ? true : false}
                        className={
                          snapshot?.isDragging ? styles.dndDragging : ''
                        }
                      >
                        <LeftSidebarElement
                          type="basic"
                          component={form.formName}
                          handlingClickLeft={handlingClickLeft}
                        />
                      </div>
                    )}
                  </Draggable>
                )
              })}
            <MedicalFormLeftSidebarDivider
              title={t('ui.medicalformbuilder.medicalcomponent.basic.medical')}
            />
            {medicalForms
              ?.filter(
                (form) =>
                  form.formName === 'basic_conditions' ||
                  form.formName === 'basic_drugs' ||
                  // form.formName === 'basic_traveldestination' ||
                  // form.formName === 'basic_vaccinescheduler' ||
                  // form.formName === 'basic_vaccinehistory' ||
                  form.formName === 'basic_labtests' ||
                  form.formName === 'basic_snomed'
              )
              .map((form) => {
                return snapshot.draggingFromThisWith === form.formName ? (
                  <div className={styles.dndCopy} key={form.id}>
                    <LeftSidebarElement
                      type="basic"
                      component={form.formName}
                      handlingClickLeft={handlingClickLeft}
                    />
                  </div>
                ) : (
                  <Draggable
                    key={form.formName}
                    draggableId={form.formName}
                    index={form.id}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isDragging={snapshot?.isDragging ? true : false}
                        className={
                          snapshot?.isDragging ? styles.dndDragging : ''
                        }
                      >
                        <LeftSidebarElement
                          type="basic"
                          component={form.formName}
                          handlingClickLeft={handlingClickLeft}
                        />
                      </div>
                    )}
                  </Draggable>
                )
              })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default MedicalFormLeftSidebarBasicPanels
