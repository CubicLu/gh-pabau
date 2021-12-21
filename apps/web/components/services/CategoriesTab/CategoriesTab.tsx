import React, { FC } from 'react'
import CategoryLayout from './CategoryLayout'

export interface NewCategory {
  name: string
  color: string
  is_active: boolean
}

export interface CP {
  perPage?: number
  searchTerm?: string
  modalShowState?: boolean
  openModal?: () => void
  closeModal?: () => void
  categoriesUpdates?: (categories: NewCategory[]) => void
}

export const CateogriesTab: FC<CP> = ({
  perPage,
  searchTerm,
  modalShowState = false,
  openModal,
  closeModal,
  categoriesUpdates,
  ...rest
}) => {
  return (
    <CategoryLayout
      perPage={perPage}
      searchTerm={searchTerm}
      modalShowState={modalShowState}
      openModal={openModal}
      closeModal={closeModal}
    />
  )
}

export default CateogriesTab
