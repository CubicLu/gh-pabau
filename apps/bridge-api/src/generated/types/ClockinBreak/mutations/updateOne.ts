import { mutationField, nonNull } from 'nexus'

export const ClockinBreakUpdateOneMutation = mutationField(
  'updateOneClockinBreak',
  {
    type: nonNull('ClockinBreak'),
    args: {
      data: nonNull('ClockinBreakUpdateInput'),
      where: nonNull('ClockinBreakWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.clockinBreak.update({
        where,
        data,
        ...select,
      })
    },
  },
)
