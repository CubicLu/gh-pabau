import { mutationField, nonNull } from 'nexus'

export const ClockinBreakUpdateManyMutation = mutationField(
  'updateManyClockinBreak',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ClockinBreakWhereInput',
      data: nonNull('ClockinBreakUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.clockinBreak.updateMany(args as any)
    },
  },
)
