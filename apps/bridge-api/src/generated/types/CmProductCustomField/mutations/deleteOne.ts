import { mutationField, nonNull } from 'nexus'

export const CmProductCustomFieldDeleteOneMutation = mutationField(
  'deleteOneCmProductCustomField',
  {
    type: 'CmProductCustomField',
    args: {
      where: nonNull('CmProductCustomFieldWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmProductCustomField.delete({
        where,
        ...select,
      })
    },
  },
)
