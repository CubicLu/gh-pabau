import { mutationField, nonNull } from 'nexus'

export const ClockinBreakUpsertOneMutation = mutationField(
  'upsertOneClockinBreak',
  {
    type: nonNull('ClockinBreak'),
    args: {
      where: nonNull('ClockinBreakWhereUniqueInput'),
      create: nonNull('ClockinBreakCreateInput'),
      update: nonNull('ClockinBreakUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.clockinBreak.upsert({
        ...args,
        ...select,
      })
    },
  },
)
