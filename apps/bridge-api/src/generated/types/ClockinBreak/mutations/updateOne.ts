import { mutationField, nonNull } from 'nexus'

export const ClockinBreakUpdateOneMutation = mutationField(
  'updateOneClockinBreak',
  {
    type: nonNull('ClockinBreak'),
    args: {
      where: nonNull('ClockinBreakWhereUniqueInput'),
      data: nonNull('ClockinBreakUpdateInput'),
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
