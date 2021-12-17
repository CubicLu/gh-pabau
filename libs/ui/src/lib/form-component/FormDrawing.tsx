import {
  ClearOutlined,
  EditOutlined,
  ExpandAltOutlined,
  HighlightOutlined,
  RedoOutlined,
  UndoOutlined,
} from '@ant-design/icons'
import { OptionType } from '@pabau/ui'
import cn from 'classnames'
import React, { FC, useEffect, useState } from 'react'
import innerDrawingIcon from '../../assets/images/medicalform_innerdrawing.svg'
import styles from './FormComponent.module.less'

enum DrawingButtonType {
  DRAWING = 0,
  ERASE = 1,
  LINE = 2,
  UNDO = 3,
  REDO = 4,
  EXPAND = 5,
}

interface P {
  title: string
  desc: string
  paramItems: OptionType[]
  required: boolean
  value?: string
}

export const FormDrawing: FC<P> = ({
  title = '',
  desc = '',
  paramItems,
  required = false,
  value = '',
}) => {
  const [items, setItems] = useState<OptionType[]>([])
  const [activeButton, setActiveButton] = useState(0)

  useEffect(() => {
    setItems(paramItems)
  }, [paramItems])

  const RenderDrawing = () => {
    let src = value
    if (!src) {
      src =
        items?.length > 0 && items[0].name !== ''
          ? `${items[0].name}`
          : innerDrawingIcon
    }
    return <img src={`https://prelive-crm.pabau.com${src}`} alt="" />
  }

  return (
    <div className={`${styles.formDrawing} ${styles.formComponet}`}>
      {title.length > 0 && (
        <div className={styles.formComponentTitle}>
          {title}
          {required && <span className={styles.formRequiredMark}>*</span>}
        </div>
      )}
      {desc.length > 0 && (
        <div className={styles.formComponentChoiceDescription}>{desc}</div>
      )}
      <div className={styles.formDrawingPanel}>
        <div className={styles.formDrawingBody}>
          <div className={styles.formDrawingToolbar}>
            <span
              onClick={() => {
                setActiveButton(DrawingButtonType.DRAWING)
              }}
              className={cn(
                styles.formDrawingToolbarButton,
                activeButton === DrawingButtonType.DRAWING ? styles.active : ''
              )}
            >
              <EditOutlined />
            </span>
            <span
              onClick={() => {
                setActiveButton(DrawingButtonType.ERASE)
              }}
              className={cn(
                styles.formDrawingToolbarButton,
                activeButton === DrawingButtonType.ERASE ? styles.active : ''
              )}
            >
              <ClearOutlined />
            </span>
            <span
              onClick={() => {
                setActiveButton(DrawingButtonType.LINE)
              }}
              className={cn(
                styles.formDrawingToolbarButton,
                activeButton === DrawingButtonType.LINE ? styles.active : ''
              )}
            >
              <HighlightOutlined />
            </span>
            <span
              onClick={() => {
                setActiveButton(DrawingButtonType.UNDO)
              }}
              className={cn(
                styles.formDrawingToolbarButton,
                activeButton === DrawingButtonType.UNDO ? styles.active : ''
              )}
            >
              <RedoOutlined />
            </span>
            <span
              onClick={() => {
                setActiveButton(DrawingButtonType.REDO)
              }}
              className={cn(
                styles.formDrawingToolbarButton,
                activeButton === DrawingButtonType.REDO ? styles.active : ''
              )}
            >
              <UndoOutlined />
            </span>
            <span
              onClick={() => {
                setActiveButton(DrawingButtonType.EXPAND)
              }}
              className={`${styles.formDrawingToolbarButton} ${styles.right}`}
            >
              <ExpandAltOutlined />
            </span>
          </div>
          <div className={styles.formDrawingArea}>
            <RenderDrawing />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormDrawing
