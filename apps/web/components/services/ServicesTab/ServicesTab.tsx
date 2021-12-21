import React, { FC } from 'react'

import ServiceLayout from './ServiceLayout'
export interface SP {
  showCreateServiceModal: boolean
  onOpenCreateServiceModal?: () => void
  onCloseCreateServiceModal?: () => void
  searchTerm?: string
  updatedCategories?: []
}

export const ServicesTab: FC<SP> = ({
  searchTerm,
  showCreateServiceModal,
  onOpenCreateServiceModal,
  onCloseCreateServiceModal,
}) => {
  return (
    <ServiceLayout
      searchTerm={searchTerm}
      showCreateServiceModal={showCreateServiceModal}
      onOpenCreateServiceModal={onOpenCreateServiceModal}
      onCloseCreateServiceModal={onCloseCreateServiceModal}
    />
  )
}

export default ServicesTab
