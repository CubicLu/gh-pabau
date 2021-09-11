import dynamic from 'next/dynamic'

export const AllTemplateModal = dynamic(
  () => import('./AllTemplateModalDynamic'),
  {
    ssr: false,
  }
)

export default AllTemplateModal
