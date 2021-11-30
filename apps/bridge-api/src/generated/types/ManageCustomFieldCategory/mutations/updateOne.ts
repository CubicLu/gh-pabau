import { mutationField, nonNull } from 'nexus'

export const ManageCustomFieldCategoryUpdateOneMutation = mutationField(
  'updateOneManageCustomFieldCategory',
  {
    type: nonNull('ManageCustomFieldCategory'),
    args: {
      data: nonNull('ManageCustomFieldCategoryUpdateInput'),
      where: nonNull('ManageCustomFieldCategoryWhereUniqueInput'),
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
