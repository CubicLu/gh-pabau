import { mutationField, nonNull } from 'nexus'

export const AvilableDatesLogUpdateOneMutation = mutationField(
  'updateOneAvilableDatesLog',
  {
    type: nonNull('AvilableDatesLog'),
    args: {
      data: nonNull('AvilableDatesLogUpdateInput'),
      where: nonNull('AvilableDatesLogWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.avilableDatesLog.update({
        where,
        data,
        ...select,
      })
    },
  },
)
