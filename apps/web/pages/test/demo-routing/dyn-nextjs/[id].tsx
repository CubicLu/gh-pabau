import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const DemoDyn = () => {
  const router = useRouter()
  return (
    <>
      <h1>dyn nextjs</h1>
      <div>
        <p>Your query is: {JSON.stringify(router.query)}</p>
        <p>Your slug is: {router.query.id}</p>
      </div>
      <li>
        <Link href="/test/demo-routing">home absolute</Link>
      </li>
      <li>
        <Link href="../">home relative</Link>
      </li>
      <li>
        <Link href="../dyn/123">dyn/123</Link>
      </li>
    </>
  )
}

export default DemoDyn
