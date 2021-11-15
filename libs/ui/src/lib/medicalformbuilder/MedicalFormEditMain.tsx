import { MedicalFormTypes } from '@pabau/ui'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import backImg from '../../assets/images/medicalform_back.svg'
import backgroundImg from '../../assets/images/medicalform_builder.svg'
import InnerElement from '../medicalform/InnerElement'
import styles from './MedicalFormBuilder.module.less'

interface P {
  draggedForms: MedicalFormTypes[]
  handlingFormSetting: (formID?: string) => void
}

function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const MedicalFormEditMain: FC<P> = ({ ...props }) => {
  const { draggedForms, handlingFormSetting } = props
  const [activatedFormID, setActivatedFormID] = useState('')
  const prevActiveFormID = usePrevious(activatedFormID)
  const { t } = useTranslation('common')

  const clearActivatedForm = () => {
    setActivatedFormID('')
  }

  const handlingSelectForm = (isActive, handleId) => {
    if (isActive) {
      setActivatedFormID(handleId)
    } else {
      clearActivatedForm()
    }
  }

  useEffect(() => {
    if (prevActiveFormID !== activatedFormID)
      handlingFormSetting?.(activatedFormID)
  }, [prevActiveFormID, handlingFormSetting, activatedFormID])

  return (
    <Droppable droppableId="MainSide">
      {(provided, snapshot) => (
        <div
          className={styles.medicalFormEditMainPanel}
          ref={provided.innerRef}
        >
          {draggedForms.length === 0 && (
            <div className={styles.medicalFormEditMainEmptyPanel}>
              <img src={backgroundImg} alt="" />
              <h1>{t('ui.medicalformbuilder.main.title')}</h1>
              <span>{t('ui.medicalformbuilder.main.description')}</span>
              <div className={styles.medicalFormEditDesc}>
                <img src={backImg} alt="" />
                <span>{t('ui.medicalformbuilder.main.edit.description')}</span>
              </div>
            </div>
          )}
          {draggedForms?.map((form, index) => {
            return (
              <Draggable key={form.id} draggableId={form.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    isDragging={snapshot?.isDragging ? true : false}
                    className={
                      snapshot?.isDragging
                        ? styles.dndMainDragging
                        : styles.dndMainNoDragging
                    }
                  >
                    <InnerElement
                      required={form.required}
                      activate={activatedFormID === `${form.id}` ? true : false}
                      type={form.formType}
                      component={form.formName}
                      handleId={form.id}
                      formData={form}
                      handlingSelectForm={handlingSelectForm}
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
  )
}

export default MedicalFormEditMain
