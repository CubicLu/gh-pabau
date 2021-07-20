import { mutationField, nonNull } from 'nexus'

export const AvilableDatesLogUpdateManyMutation = mutationField(
  'updateManyAvilableDatesLog',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AvilableDatesLogWhereInput',
      data: nonNull('AvilableDatesLogUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.avilableDatesLog.updateMany(args as any)
    },
  },
)
