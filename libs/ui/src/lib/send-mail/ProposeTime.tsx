import React, { FC, useState } from 'react'
import { Popover } from 'antd'
import { Avatar } from '@pabau/ui'
import { CaretDownFilled } from '@ant-design/icons'
import { ReactComponent as CalendarPlusOutlined } from '../../assets/images/calendar-plus.svg'
import userAvatar from '../../assets/images/users/austin.png'
import styles from './ProposeTime.module.less'

export interface ProposeTimeProps {
  onSelected: (value: string) => void
}

export const ProposeTime: FC<ProposeTimeProps> = ({ onSelected }) => {
  const proposeTimeItems = [
    { title: 'Initial Consultion (1 hour)', avatar: userAvatar },
    { title: 'Initial Consultion (1 hour)', avatar: userAvatar },
  ]
  const scheduledItems = [
    { title: 'Initial Consultion (1 hour)', avatar: userAvatar },
  ]
  const consultionPopoverTitle = 'Hair'
  const consultionItems = [
    'Japanese straightening',
    'Haircuts and hairdressing',
    'Haircuts and hairdressing',
    'Hair transplants',
  ]
  const [showProposeTimePopover, setShowProposeTimePopover] = useState(false)
  const [showConsultionPopover, setShowConsultionPopover] = useState(false)
  const handleClickProposeTimeItem = (value) => {
    setShowProposeTimePopover(false)
    const time = `<div><a href="/about">${value}</a></div>`
    onSelected(time)
  }
  const consultionPopover = (
    <div className={styles.consultionPopoverContainer}>
      {consultionItems.map((item, index) => (
        <div
          className={styles.consultionPopoverItem}
          key={`consultion-item-${index}`}
          onClick={() => handleClickProposeTimeItem(item)}
        >
          {item}
        </div>
      ))}
    </div>
  )
  const proposeTimePopoverTitle = (
    <div
      className={styles.proposeTimePopoverTitle}
      onClick={() => setShowConsultionPopover((e) => !e)}
    >
      <div>Consultion</div>
      <div>
        <Popover
          visible={showConsultionPopover}
          onVisibleChange={(visible) => setShowConsultionPopover(visible)}
          trigger="click"
          placement="bottomLeft"
          title={consultionPopoverTitle}
          content={consultionPopover}
          overlayClassName={styles.consultionPopover}
        >
          <CaretDownFilled />
        </Popover>
      </div>
    </div>
  )
  const proposeTimePopover = (
    <div className={styles.proposeTimePopoverContainer}>
      {proposeTimeItems.map((item, index) => (
        <div
          className={styles.proposeTimeItem}
          key={`propose-time-item-${index}`}
          onClick={() => handleClickProposeTimeItem(item.title)}
        >
          <div>
            <Avatar src={item.avatar} size={32} />
          </div>
          <div>{item.title}</div>
        </div>
      ))}
      {scheduledItems.length > 0 && (
        <React.Fragment>
          <div className={styles.scheduledTitle}>Scheduled</div>
          {scheduledItems.map((item, index) => (
            <div
              className={styles.proposeTimeItem}
              key={`scheduled-propose-time-item-${index}`}
              onClick={() => handleClickProposeTimeItem(item.title)}
            >
              <div>
                <Avatar src={item.avatar} size={32} />
              </div>
              <div>{item.title}</div>
            </div>
          ))}
        </React.Fragment>
      )}
    </div>
  )
  return (
    <Popover
      visible={showProposeTimePopover}
      onVisibleChange={(visible) => setShowProposeTimePopover(visible)}
      placement="topRight"
      trigger="click"
      title={proposeTimePopoverTitle}
      content={proposeTimePopover}
      overlayClassName={styles.proposeTimePopover}
    >
      <div
        className={styles.proposeTimeContainer}
        onClick={() => setShowProposeTimePopover((e) => !e)}
      >
        <div>
          <CalendarPlusOutlined />
        </div>
        <div>Propose Times</div>
        <div>
          <CaretDownFilled />
        </div>
      </div>
    </Popover>
  )
}

export default ProposeTime
