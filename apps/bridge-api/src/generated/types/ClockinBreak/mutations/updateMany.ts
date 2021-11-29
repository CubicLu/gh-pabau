import { mutationField, nonNull } from 'nexus'

export const ClockinBreakUpdateManyMutation = mutationField(
  'updateManyClockinBreak',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ClockinBreakUpdateManyMutationInput'),
      where: 'ClockinBreakWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.clockinBreak.updateMany(args as any)
    },
  },
)
