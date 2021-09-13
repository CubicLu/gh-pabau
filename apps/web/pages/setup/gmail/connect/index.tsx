import dynamic from 'next/dynamic'

const Connect = dynamic(() => import('../../../../components/Email/connect'), {
  ssr: false,
})
const Index = () => {
  return <Connect />
}
export default Index
