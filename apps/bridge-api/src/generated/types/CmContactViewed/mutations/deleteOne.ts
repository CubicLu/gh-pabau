import { mutationField, nonNull } from 'nexus'

export const CmContactViewedDeleteOneMutation = mutationField(
  'deleteOneCmContactViewed',
  {
    type: 'CmContactViewed',
    args: {
      where: nonNull('CmContactViewedWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmContactViewed.delete({
        where,
        ...select,
      })
    },
  },
)
