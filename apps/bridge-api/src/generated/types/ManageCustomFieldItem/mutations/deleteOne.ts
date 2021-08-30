import { mutationField, nonNull } from 'nexus'

export const ManageCustomFieldItemDeleteOneMutation = mutationField(
  'deleteOneManageCustomFieldItem',
  {
    type: 'ManageCustomFieldItem',
    args: {
      where: nonNull('ManageCustomFieldItemWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.manageCustomFieldItem.delete({
        where,
        ...select,
      })
    },
  },
)
