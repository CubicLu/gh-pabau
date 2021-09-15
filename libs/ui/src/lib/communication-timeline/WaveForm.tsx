import React, { useState, useEffect } from 'react'
import WaveSurfer from 'wavesurfer.js'
import styles from './WaveForm.module.less'
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons'

interface WaveFormProps {
  audioFile: string
}

const WaveSurferStatelessForm = ({ audioFile }: WaveFormProps): JSX.Element => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [waveSurfer, setWaveSurfer] = useState<WaveSurfer>(null)

  useEffect(() => {
    setWaveSurfer(
      WaveSurfer.create({
        barWidth: 1,
        cursorWidth: 1,
        container: '#waveform',
        backend: 'WebAudio',
        height: 30,
        barGap: 2.5,
        progressColor: '#54b2d3',
        responsive: true,
        waveColor: '#9292A3',
        cursorColor: 'transparent',
      })
    )
  }, [])

  useEffect(() => {
    if (waveSurfer) {
      waveSurfer.load(audioFile)
    }
  }, [waveSurfer, audioFile])

  const togglePlayPause = () => {
    waveSurfer.playPause()
    setIsPlaying((e) => !e)
  }

  return (
    <div className={styles.waveFormContainer}>
      <div className={styles.playButton} onClick={togglePlayPause}>
        {!isPlaying ? <CaretRightOutlined /> : <PauseOutlined />}
      </div>
      <div className={styles.wave} id="waveform" />
    </div>
  )
}

export default WaveSurferStatelessForm
