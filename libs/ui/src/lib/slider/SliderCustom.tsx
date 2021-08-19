import React, { FC, useState, useEffect } from 'react'
import { Slider as AntSlider } from 'antd'

import styles from './Slider.module.less'

export interface SliderCustomProps {
  data: SliderCustomDataProps[]
  handleChange: (value?: SliderCustomDataProps) => void
  value?: number
}

export interface SliderCustomDataProps {
  id?: number
  name: string
}

interface MarkProps {
  [key: number]: SliderCustomDataProps
}

export const SliderCustom: FC<SliderCustomProps> = ({
  data,
  handleChange,
  value,
}) => {
  const [marks, setMarks] = useState<MarkProps>()
  const [markValue, setMarkValue] = useState(0)
  const [selected, setSelected] = useState<SliderCustomDataProps>()
  const [markData] = useState<SliderCustomDataProps[]>(data)

  useEffect(() => {
    const mark = {}
    if (markData.length > 0) {
      if (markData.length > 1) {
        for (const index in markData) {
          const markPoint =
            (Number.parseInt(index) * 100) / (markData.length - 1)
          mark[markPoint] = markData[index]
        }
      } else {
        mark[100] = markData[0]
      }
      setMarks(mark)
      setSelected(markData[0])
    }
  }, [markData])

  useEffect(() => {
    if (value && marks) {
      for (const [key, markValue] of Object.entries(marks)) {
        if (markValue.id === value) {
          setMarkValue(Number.parseInt(key))
          setSelected(markValue)
          break
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const onChangeSlider = (value) => {
    setSelected(marks?.[value])
    handleChange(marks?.[value])
  }

  return (
    <div className={styles.sliderCustom}>
      <AntSlider
        marks={marks}
        step={null}
        tooltipVisible={false}
        onChange={onChangeSlider}
        value={markValue}
      />
      <div className={styles.sliderCustomTitle}>{selected?.name}</div>
    </div>
  )
}

export default SliderCustom
