import { mutationField, nonNull } from 'nexus'

export const CmContactLocationDeleteOneMutation = mutationField(
  'deleteOneCmContactLocation',
  {
    type: 'CmContactLocation',
    args: {
      where: nonNull('CmContactLocationWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmContactLocation.delete({
        where,
        ...select,
      })
    },
  },
)
