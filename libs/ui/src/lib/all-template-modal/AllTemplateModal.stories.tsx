import React, { FC, useEffect, useState } from 'react'
import AllTemplateModal, {
  CategoryOptionsProps,
  TopCategoriesProps,
  AllTemplateModalProps,
  AllDocumentProps,
} from './AllTemplateModalDynamic'
import {
  categoryOptions,
  topCategories,
  recipientList,
  allDocument,
} from './mock'
export default {
  component: AllTemplateModal,
  title: 'UI/AllTemplateModal',
  args: {
    title: 'All Template',
    visible: true,
    categoryOptions,
    topCategories,
    recipientList,
    allDocument,
  },
  argTypes: {
    title: { control: { type: 'text' } },
    visible: { control: { type: 'boolean' } },
    categoryOptions: { control: { type: 'object' } },
    topCategories: { control: { type: 'object' } },
    recipientList: { control: { type: 'object' } },
    allDocument: { control: { type: 'object' } },
  },
}
export const AllTemplateModalStory: FC<AllTemplateModalProps> = ({
  title,
  visible,
  categoryOptions,
  topCategories,
  recipientList,
  allDocument,
}) => {
  const [CategoryOptions, setCategoriesOptions] = useState<
    CategoryOptionsProps[]
  >([])
  const [TopCategories, setTopCategories] = useState<TopCategoriesProps[]>([])
  const [AllDocument, setAllDocument] = useState<AllDocumentProps[]>([])
  useEffect(() => {
    if (categoryOptions) setCategoriesOptions([...categoryOptions])
    if (topCategories) setTopCategories([...topCategories])
    if (allDocument) setAllDocument([...allDocument])
  }, [categoryOptions, topCategories, allDocument])
  return (
    <AllTemplateModal
      title={title}
      visible={visible}
      categoryOptions={CategoryOptions}
      topCategories={TopCategories}
      recipientList={recipientList}
      allDocument={AllDocument}
    />
  )
}
