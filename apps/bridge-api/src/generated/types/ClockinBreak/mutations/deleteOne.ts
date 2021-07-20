import { mutationField, nonNull } from 'nexus'

export const ClockinBreakDeleteOneMutation = mutationField(
  'deleteOneClockinBreak',
  {
    type: 'ClockinBreak',
    args: {
      where: nonNull('ClockinBreakWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.clockinBreak.delete({
        where,
        ...select,
      })
    },
  },
)
