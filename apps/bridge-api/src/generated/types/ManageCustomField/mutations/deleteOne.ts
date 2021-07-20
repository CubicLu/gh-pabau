import { mutationField, nonNull } from 'nexus'

export const ManageCustomFieldDeleteOneMutation = mutationField(
  'deleteOneManageCustomField',
  {
    type: 'ManageCustomField',
    args: {
      where: nonNull('ManageCustomFieldWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.manageCustomField.delete({
        where,
        ...select,
      })
    },
  },
)
