import { mutationField, nonNull } from 'nexus'

export const ManageCustomFieldCategoryCreateOneMutation = mutationField(
  'createOneManageCustomFieldCategory',
  {
    type: nonNull('ManageCustomFieldCategory'),
    args: {
      data: nonNull('ManageCustomFieldCategoryCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.manageCustomFieldCategory.create({
        data,
        ...select,
      })
    },
  },
)
