/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

export function elapsedTime(
  durationMins: number,
  startDate: string
): { isCompleted: boolean; elapsedTime: string } {
  const [seconds, setSeconds] = useState('0')
  const [minutes, setMinutes] = useState('0')
  const [hours, setHours] = useState('0')
  const [timer, setTimer] = useState(0)
  const [complete, onComplete] = useState(false)

  useEffect(() => {
    let interval
    const currentDate = dayjs()
    const startDt = dayjs(startDate)
    const currDt = new Date()
    const endDt = new Date(startDate)
    endDt.setMinutes(endDt.getMinutes() + durationMins)
    if (endDt.getTime() > currDt.getTime()) {
      const hoursDiff = currentDate.diff(startDt, 'hour')
      const minDiff = currentDate.diff(startDt, 'minute')
      const secDiff = currentDate.diff(startDt, 'second')

      setHours(String(hoursDiff))
      if (minDiff >= 60) {
        const rMinDiff = minDiff % 60
        setMinutes(String(rMinDiff))
      } else {
        setMinutes(String(minDiff))
      }
      if (secDiff >= 60) {
        const rSecDiff = secDiff % 60
        setSeconds(String(rSecDiff))
      } else {
        setSeconds(String(secDiff))
      }

      interval = setInterval(() => {
        setTimer(timer + 1)
      }, 1000)
      return () => {
        clearInterval(interval)
      }
    } else {
      clearInterval(interval)
      onComplete(true)
      setHours('0')
      setMinutes('0')
      setSeconds('0')
    }
  }, [startDate, timer, durationMins])

  return {
    isCompleted: complete,
    elapsedTime: `${Number(hours) > 9 ? hours : '0' + hours}:${
      Number(minutes) > 9 ? minutes : '0' + minutes
    }:${Number(seconds) > 9 ? seconds : '0' + seconds}`,
  }
}
