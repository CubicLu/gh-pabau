import * as React from 'react'
import Link from 'next/link'

const DemoIndex = () => {
  return (
    <>
      <h1>Demo Routing</h1>
      <li>
        <Link href="demo-routing/page2">page 2</Link>
      </li>
      <li>
        <Link href="demo-routing/page3">page 3</Link>
      </li>
      <li>
        <Link href="demo-routing/dyn/123">dyn/123</Link>
      </li>
      <li>
        <Link href="demo-routing/dyn-nextjs/123">dyn-nextjs/123</Link>
      </li>
      <li>
        <Link href="demo-routing/dyn-both/123">dyn-both/123</Link>
      </li>
      <li>
        <Link
          href={{
            pathname: 'demo-routing/dyn/[id]',
            query: { id: '456' },
          }}
        >
          dyn/456
        </Link>
      </li>
    </>
  )
}

export default DemoIndex
