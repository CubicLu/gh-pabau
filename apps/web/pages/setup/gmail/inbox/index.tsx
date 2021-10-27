import dynamic from 'next/dynamic'

const Inbox = dynamic(() => import('../../../../components/Email/inbox'), {
  ssr: false,
})
const Index = () => {
  return <Inbox />
}
export default Index
