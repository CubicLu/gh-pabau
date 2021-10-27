import React, { FC, useState } from 'react'
import styles from '../CreateCall.module.less'
import { CloseOutlined, DownOutlined, UpOutlined } from '@ant-design/icons'
import { ReactComponent as Network } from '../../../assets/images/popout/network.svg'
import { ReactComponent as Record } from '../../../assets/images/popout/record.svg'
import { ReactComponent as Microphone } from '../../../assets/images/popout/microphoneRed.svg'
import { ReactComponent as Headphones } from '../../../assets/images/popout/headphones.svg'
import TextArea from 'antd/lib/input/TextArea'
import { Button, Popover, Select, Switch } from 'antd'
import { ReactComponent as SoundLevel } from '../../../assets/images/popout/soundLevel.svg'

export interface AddPhoneRecordProps {
  changeScreen?: () => void
  changeScreenCall: () => void
  phoneValue: string
}
const CallFailed: FC<AddPhoneRecordProps> = ({
  changeScreen,
  changeScreenCall,
  phoneValue,
}) => {
  const [closepopout, setClosePopout] = useState(true)
  const [audioValue, setAudioValue] = useState(false)
  function handleAudio() {
    setAudioValue(!audioValue)
  }
  function handleClose() {
    setClosePopout(false)
  }
  const MicSettings = () => {
    return (
      <div className={styles.initiateCallMicSettings}>
        <div>
          <b>Audio Setup</b>
        </div>
        <p className={styles.initiateCallSpeaker}>Speakers Setup</p>
        <div className={styles.initiateCallDefault}>
          <Select
            defaultValue={'Default - Speakers/Headphones (Realtek (R) Audio)}'}
            placeholder="select an outcome"
            style={{ width: '100%' }}
          >
            <option value="Default - Speakers/Headphones (Realtek (R) Audio)">
              Default - Speakers/Headphones (Realtek (R) Audio)
            </option>
          </Select>
          <Button className={styles.initiatePlayBtn}>Play Speaker Sound</Button>
        </div>
        <div>
          <p className={styles.initiateCallSpeaker}>Microphone</p>
          <Select
            defaultValue={'Default - Microphone (Realtek (R) Audio)'}
            placeholder="select an outcome"
            style={{ width: '100%' }}
          >
            <option value="Default - Microphone (Realtek (R) Audio)">
              Default - Microphone (Realtek (R) Audio)
            </option>
          </Select>
          <SoundLevel />
        </div>
      </div>
    )
  }
  return (
    <div className={styles.callFailed}>
      {closepopout && (
        <div className={styles.callFailedPopoutMessage}>
          <div className={styles.customPopup}>
            <Microphone />
            <p>
              Microphone or speakers could not be accessed. Check them under
              <span
                className={styles.fakeLink}
                style={{ color: 'red' }}
                id="fake-link-1"
              >
                audio settings. Troubleshoot.
              </span>
            </p>
          </div>
          <CloseOutlined onClick={handleClose} />
        </div>
      )}
      <div className={styles.callFailedCallerInfo}>
        <div className={styles.initialMainWrap}>
          <DownOutlined />
          <div className={styles.initialIcon}>
            <h5>William</h5>
            <span>{phoneValue}</span>
          </div>
        </div>
        <div className={styles.callWrapper}>
          <div className={styles.initiateCallName}>
            <h6>Call failed</h6>
          </div>
          <Button
            style={{
              color: '#FFFFFF',
              backgroundColor: '#54B2D3',
              border: 'none',
            }}
            onClick={changeScreenCall}
          >
            Redial
          </Button>
        </div>
      </div>
      <div className={styles.callFailedStatusBar}>
        <div className={styles.failedStatusWrapper}>
          {/*<div className={styles.audioWrap}>*/}
          {/*  {!audioValue ? (*/}
          {/*    <div className={styles.headAudio} onClick={handleAudio}>*/}
          {/*      <span className={styles.tagIcon}>*/}
          {/*        <Headphones />*/}
          {/*        <h6>Audio</h6>*/}
          {/*      </span>*/}
          {/*      <DownOutlined />*/}
          {/*    </div>*/}
          {/*  ) : (*/}
          {/*    <div className={styles.headAudio} onClick={handleAudio}>*/}
          {/*      <span className={styles.tagIcon}>*/}
          {/*        <Headphones />*/}
          {/*        <h6>Audio</h6>*/}
          {/*      </span>*/}
          {/*      <DownOutlined />*/}
          {/*    </div>*/}
          {/*  )}*/}
          {/*  <Network />*/}
          {/*</div>*/}
          <div className={styles.audioWrap}>
            {!audioValue ? (
              <div
                className={styles.headAudio}
                onClick={handleAudio}
                style={{ cursor: 'pointer' }}
              >
                <span className={styles.tagIcon}>
                  <Headphones />
                  <h6>Audio</h6>
                </span>
                <Popover
                  placement={'bottomRight'}
                  content={<MicSettings />}
                  trigger="click"
                >
                  <DownOutlined />
                </Popover>
              </div>
            ) : (
              <div
                className={styles.headAudio}
                onClick={handleAudio}
                style={{ cursor: 'pointer' }}
              >
                <span className={styles.tagIcon} style={{ color: '#40A0C1' }}>
                  <Headphones />
                  <h6>Audio</h6>
                </span>
                <Popover
                  placement={'bottomRight'}
                  content={<MicSettings />}
                  trigger="click"
                >
                  <UpOutlined
                    style={{ color: '#40A0C1' }}
                    // onClick={() => <Popover content={<MicSettings />} />}
                  />
                </Popover>
              </div>
            )}
            <div
              className={styles.initiateCallNetwork}
              style={{
                cursor: 'pointer',
              }}
            >
              <Popover
                placement={'bottomRight'}
                className={styles.Popover}
                style={{ color: '#FFFFFF', backgroundColor: 'darkcyan' }}
                content={'Strong Network'}
              >
                <Network />
              </Popover>
            </div>
          </div>
        </div>
        <div className={styles.failedNotesWrapper}>
          <h5>Notes</h5>
          <div className={styles.initiateCallTextArea}>
            <TextArea rows={10} placeholder={'Take notes on this call'} />
          </div>
          <div className={styles.switchBtn}>
            <Record style={{ color: 'red' }} />
            Record
            <Switch />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallFailed

// {/*<div>*/}
// {/*  <Microphone />*/}
// {/*</div>*/}
// {/*<div>*/}
// {/*  <Microphone />*/}
// {/*</div>*/}
// {/*<div>*/}
// {/*  <Microphone />*/}
// {/*</div>*/}

// {/*<div className={styles.callFailedCallerInfo}>*/}
// {/*  <div style={{ margin: '28px 484px 28px 16px' }}>*/}
// {/*    <DownOutlined />*/}
// {/*  </div>*/}
// {/*  <div style={{ margin: '12px 360px 36px 40px' }}>William</div>*/}
// {/*  <div>Call failed</div>*/}
// {/*  <Button style={{ color: '#FFFFFF', backgroundColor: '#54B2D3' }}>*/}
// {/*    Redial*/}
// {/*  </Button>*/}
// {/*</div>*/}
