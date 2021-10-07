import { mutationField, nonNull } from 'nexus'

export const AvilableDatesLogUpsertOneMutation = mutationField(
  'upsertOneAvilableDatesLog',
  {
    type: nonNull('AvilableDatesLog'),
    args: {
      where: nonNull('AvilableDatesLogWhereUniqueInput'),
      create: nonNull('AvilableDatesLogCreateInput'),
      update: nonNull('AvilableDatesLogUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.avilableDatesLog.upsert({
        ...args,
        ...select,
      })
    },
  },
)
