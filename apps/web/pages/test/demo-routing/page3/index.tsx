import * as React from 'react'
import Link from 'next/link'

const DemoPage3 = () => {
  return (
    <>
      <h1>Demo Routing</h1>
      <li>
        <Link href="/test/demo-routing">home absolute</Link>
      </li>
      <li>
        <Link href="./">home relative</Link>
      </li>
      <li>
        <Link href="../dyn/123">dyn/123</Link>
      </li>
    </>
  )
}

export default DemoPage3
