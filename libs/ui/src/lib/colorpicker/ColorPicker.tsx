import React, { FC, useState } from 'react'
import styles from './ColorPicker.module.less'
import classNames from 'classnames'
import { CheckOutlined, PlusOutlined } from '@ant-design/icons'
import { SketchPicker } from 'react-color'
interface P {
  color: string
  selected: boolean
  isDarkColor?: boolean
  onClick(): void
  onHover?(): void
  onLeave?(): void
  isRoundColorPicker?: boolean
}

const ColorItem: FC<P> = ({
  color,
  selected,
  isDarkColor = false,
  onClick,
  onHover,
  onLeave,
  isRoundColorPicker = false,
}) => {
  return (
    <div
      className={classNames(
        styles.colorItem,
        selected && (styles.selectedColor || styles.selectedPickerColor),
        !isDarkColor && styles.toggleOpacity
      )}
      style={{
        backgroundColor: color,
        border: selected ? '1px solid #54B2D3' : 'none',
        boxSizing: 'border-box',
        opacity: selected ? '1' : '0.3',
      }}
      onClick={() => {
        onClick()
      }}
      onMouseEnter={() => onHover?.()}
      onMouseLeave={() => onLeave?.()}
    >
      <CheckOutlined className={styles.badge} />
    </div>
  )
}

interface PickerProps {
  heading: string
  selectedColor?: string
  isDarkColor?: boolean
  onSelected(val): void
  onHover?(val): void
  onLeave?(val): void
  className?: string
  isRoundColorPicker?: boolean
  customColorData?: string[]
}

const colorDataList = [
  '#03DBFC',
  '#FCA903',
  '#8C03FC',
  '#0FFC03',
  '#03FCFC',
  '#5E03FC',
  '#03E7FC',
  '#45FC03',
  '#84FC03',
  '#FCF403',
  '#FCCE03',
  '#D2FC03',
  '#F4FC03',
  '#BF15C2',
  '#486578',
]

export const ColorPicker: FC<PickerProps> = ({
  heading = 'Background color',
  selectedColor = '',
  isDarkColor = false,
  onSelected,
  onHover,
  onLeave,
  isRoundColorPicker = false,
  className,
  customColorData,
}) => {
  const colorData = customColorData || colorDataList
  const [selColor, setSelColor] = useState(selectedColor)
  const [isCustom, setIsCustomColor] = useState(
    colorData.includes(selectedColor)
  )
  const [isAddingColor, setIsAddingColor] = useState(false)

  const onClickColorItem = (color) => {
    setIsCustomColor(colorData.includes(color))
    setSelColor(color)
    onSelected(color)
  }
  const onClickAddCustomColor = () => {
    setIsAddingColor((e) => !e)
  }
  const handleChangeComplete = (color) => {
    setIsCustomColor(colorData.includes(color.hex))
    onClickColorItem(color.hex)
    setSelColor(color.hex)
    setIsAddingColor((e) => !e)
  }
  return (
    <div>
      <span className={styles.heading}>{heading}</span>
      <div
        className={`${styles.colorPickerWrap} ${
          isRoundColorPicker && className
        }`}
      >
        {colorData.map((color) => (
          <ColorItem
            key={`${heading}${color}`}
            color={color}
            selected={color === selColor}
            isDarkColor={isDarkColor}
            onClick={() => onClickColorItem(color)}
            onHover={() => onHover?.(color)}
            onLeave={() => onLeave?.(color)}
            isRoundColorPicker={isRoundColorPicker}
          />
        ))}
        <div
          className={styles.addColor}
          style={{
            background: isCustom ? 'transparent' : selColor,
          }}
          onClick={() => onClickAddCustomColor()}
        >
          <PlusOutlined />
        </div>
      </div>
      {isAddingColor && (
        <SketchPicker
          className={styles.customPicker}
          color={selColor}
          presetColors={[]}
          disableAlpha={true}
          onChangeComplete={(color) => handleChangeComplete(color)}
        />
      )}
    </div>
  )
}

export default ColorPicker
