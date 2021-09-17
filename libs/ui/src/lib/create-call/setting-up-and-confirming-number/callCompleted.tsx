import React, { FC } from 'react'
import styles from '../CreateCall.module.less'
import TextArea from 'antd/lib/input/TextArea'
import { Button, Checkbox, Rate, Select } from 'antd'

export interface CallCompletedProps {
  changeScreen: () => void
}
const CallCompleted: FC<CallCompletedProps> = ({ changeScreen }) => {
  return (
    <div className={styles.callCompleted}>
      <div className={styles.callCompletedLabel}>
        <label>Labels</label>
        <Select placeholder="select an outcome" style={{ width: 210 }}>
          <option value="Busy">Busy</option>
          <option value="Connected">Connected</option>
          <option value="Left live message">Left live message</option>
          <option value="Left voicemail">Left voicemail</option>
          <option value="No answer">No answer</option>
          <option value="Wrong number">Wrong number</option>
        </Select>
      </div>
      <h5>Notes</h5>
      <div className={styles.callCompletedTextArea}>
        <TextArea rows={10} placeholder={'Take notes on this call'} />
      </div>
      <div className={styles.rateStatus}>
        Rate call quality
        <Rate />
      </div>
      <div className={styles.wrapTask}>
        <Checkbox>Create a follow up task</Checkbox>
        <Button
          style={{ color: '#FFFFFF', backgroundColor: '#54B2D3' }}
          onClick={changeScreen}
        >
          Save
        </Button>
      </div>
    </div>
  )
}

export default CallCompleted

// {/*<div>*/}
// {/*  <Microphone />*/}
// {/*</div>*/}
// {/*<div>*/}
// {/*  <Microphone />*/}
// {/*</div>*/}
// {/*<div>*/}
// {/*  <Microphone />*/}
// {/*</div>*/}
