import { mutationField, nonNull } from 'nexus'

export const CustomFieldDisplayDeleteOneMutation = mutationField(
  'deleteOneCustomFieldDisplay',
  {
    type: 'CustomFieldDisplay',
    args: {
      where: nonNull('CustomFieldDisplayWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.customFieldDisplay.delete({
        where,
        ...select,
      })
    },
  },
)
