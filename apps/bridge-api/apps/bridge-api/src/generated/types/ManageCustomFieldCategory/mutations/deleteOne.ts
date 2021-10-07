import { mutationField, nonNull } from 'nexus'

export const ManageCustomFieldCategoryDeleteOneMutation = mutationField(
  'deleteOneManageCustomFieldCategory',
  {
    type: 'ManageCustomFieldCategory',
    args: {
      where: nonNull('ManageCustomFieldCategoryWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.manageCustomFieldCategory.delete({
        where,
        ...select,
      })
    },
  },
)
