import { mutationField, nonNull } from 'nexus'

export const AvilableDatesLogUpdateManyMutation = mutationField(
  'updateManyAvilableDatesLog',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AvilableDatesLogUpdateManyMutationInput'),
      where: 'AvilableDatesLogWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.avilableDatesLog.updateMany(args as any)
    },
  },
)
