import { mutationField, nonNull } from 'nexus'

export const ManageCustomFieldCategoryUpdateOneMutation = mutationField(
  'updateOneManageCustomFieldCategory',
  {
    type: nonNull('ManageCustomFieldCategory'),
    args: {
      where: nonNull('ManageCustomFieldCategoryWhereUniqueInput'),
      data: nonNull('ManageCustomFieldCategoryUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.manageCustomFieldCategory.update({
        where,
        data,
        ...select,
      })
    },
  },
)
