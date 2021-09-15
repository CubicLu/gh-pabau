import React, { FC, useState } from 'react'
import styles from '../CreateCall.module.less'
import { CloseOutlined, DownOutlined, UpOutlined } from '@ant-design/icons'
import { ReactComponent as Microphone } from '../../../assets/images/popout/microphone.svg'
import { ReactComponent as Keypad } from '../../../assets/images/popout/keypad.svg'
import { ReactComponent as Network } from '../../../assets/images/popout/network.svg'
import { ReactComponent as Record } from '../../../assets/images/popout/record.svg'
import { ReactComponent as CallEnd } from '../../../assets/images/popout/CallEnd.svg'
import { ReactComponent as Headphones } from '../../../assets/images/popout/headphones.svg'
import { ReactComponent as Mute } from '../../../assets/images/popout/mute.svg'
import { ReactComponent as SoundLevel } from '../../../assets/images/popout/soundLevel.svg'
import TextArea from 'antd/lib/input/TextArea'
import { Button, Input, Popover, Select, Switch } from 'antd'

export interface AddPhoneRecordProps {
  changeScreen: () => void
  phoneValue: string
}
const InitiatingCall: FC<AddPhoneRecordProps> = ({
  changeScreen,
  phoneValue,
}) => {
  const [audioValue, setAudioValue] = useState(false)
  const [keypadValue, setKeypadValue] = useState(false)
  const [muteValue, setMuteValue] = useState(true)
  const [textValue, setTextValue] = useState('')
  function handleAudio() {
    setAudioValue(!audioValue)
  }
  function handleKeypad() {
    setKeypadValue(!keypadValue)
  }
  function handleMute() {
    setMuteValue(!muteValue)
  }
  function handleText(e) {
    return setTextValue(textValue + e)
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

  // }
  return (
    <div className={styles.initiateCall}>
      <div className={styles.initiateCallCallerInfo}>
        <div className={styles.initialMainWrap}>
          <DownOutlined />
          <div className={styles.initialIcon}>
            <h5>William</h5>
            <span>{phoneValue}</span>
          </div>
        </div>
        <div className={styles.callWrapper}>
          <div className={styles.initiateCallName}>
            <h6>Ongoing call</h6>
            <span>02:46</span>
          </div>
          <div onClick={changeScreen} style={{ cursor: 'pointer' }}>
            <CallEnd />
          </div>
        </div>
      </div>
      {!keypadValue ? (
        <div className={styles.initiateCallStatusBar}>
          <div className={styles.initiateStatusWrapper}>
            <div className={styles.microWrap} style={{ cursor: 'pointer' }}>
              <span>
                <div onClick={handleMute}>
                  {muteValue ? <Microphone /> : <Mute />}
                </div>
                <h6>Mute</h6>
              </span>
              <span>
                <div onClick={handleKeypad}>
                  <Keypad />
                </div>
                <h6>Keypad</h6>
              </span>
            </div>
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
          <div className={styles.notesWrapper}>
            <h5>Notes</h5>
            <div className={styles.initiateCallTextArea}>
              <TextArea rows={13} placeholder={'Take notes on this call'} />
            </div>
            <div className={styles.switchBtn}>
              <Record style={{ color: 'red' }} />
              Record
              <Switch />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.initiateCallClose} onClick={handleKeypad}>
            <CloseOutlined />
          </div>
          <div className={styles.keypadInput}>
            <Input
              style={{ textAlign: 'center' }}
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              contentEditable={true}
            />
          </div>
          <div className={styles.keyGridContainer}>
            <div className={styles.keyGridItem} onClick={() => handleText(1)}>
              <span defaultValue={1}>1</span>
            </div>
            <div className={styles.keyGridItem} onClick={() => handleText(2)}>
              <span>2</span>
              <p>ABC</p>
            </div>
            <div className={styles.keyGridItem} onClick={() => handleText(3)}>
              <span>3</span>
              <p>DEF</p>
            </div>
            <div className={styles.keyGridItem} onClick={() => handleText(4)}>
              <span>4</span>
              <p>GHI</p>
            </div>
            <div className={styles.keyGridItem} onClick={() => handleText(5)}>
              <span>5</span>
              <p>JKL</p>
            </div>
            <div className={styles.keyGridItem} onClick={() => handleText(6)}>
              <span>6</span>
              <p>MNO</p>
            </div>
            <div className={styles.keyGridItem} onClick={() => handleText(7)}>
              <span>7</span>
              <p>PQRS</p>
            </div>
            <div className={styles.keyGridItem} onClick={() => handleText(8)}>
              <span>8</span>
              <p>TUV</p>
            </div>
            <div className={styles.keyGridItem} onClick={() => handleText(9)}>
              <span>9</span>
              <p>WXYZ</p>
            </div>
            <div className={styles.keyGridItem} onClick={() => handleText('*')}>
              *
            </div>
            <div className={styles.keyGridItem} onClick={() => handleText(0)}>
              0
            </div>
            <div className={styles.keyGridItem} onClick={() => handleText('#')}>
              #
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InitiatingCall

// {/*<div>*/}
// {/*  <Microphone />*/}
// {/*</div>*/}
// {/*<div>*/}
// {/*  <Microphone />*/}
// {/*</div>*/}
// {/*<div>*/}
// {/*  <Microphone />*/}
// {/*</div>*/}
