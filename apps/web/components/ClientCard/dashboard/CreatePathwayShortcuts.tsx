import { useRouter } from 'next/router'
import Link from 'next/link'

const CreatePathwayShortcuts = () => {
  const router = useRouter()
  return (
    <>
      <h1>{router.query.id}</h1>
      <Link
        href="/clients/[id]/execute/[id]"
        as={`/clients/${router.query.id}/execute/1`}
      >
        pathway 1
      </Link>
      <a>two</a>
    </>
  )
}

export default CreatePathwayShortcuts
