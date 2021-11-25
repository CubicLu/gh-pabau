import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import packageJson from '../../../../package.json'
import { useUser } from '../../context/UserContext'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

const { version } = packageJson

dayjs.extend(utc)
dayjs.extend(timezone)

const IndexPage = (): JSX.Element => {
  const user = useUser()

  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [time])

  const currentTime = (tz: string) => {
    return dayjs().tz(tz).format('MM/DD/YYYY, hh:mm:ss A')
  }

  return (
    <>
      <h1>Demo Page</h1>
      <p>Version {version}</p>
      <p>
        Browser TZ: &#160; {dayjs.tz.guess()} &#160;&#160;&#160; Current Time:
        &#160; {currentTime(dayjs.tz.guess())}
        <br />
        User TZ: &#160; {user?.me?.timezone?.replace(' ', '_')}{' '}
        &#160;&#160;&#160; Current Time: &#160;{' '}
        {currentTime(user?.me?.timezone?.replace(' ', '_'))}
        <br />
        User ID: &#160; {user?.me?.user}
        <br />
        Company ID: &#160; {user?.me?.company}
        <hr />
        <small>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </small>
      </p>
    </>
  )
}

export default IndexPage
