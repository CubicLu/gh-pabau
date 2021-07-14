import { mutationField, nonNull } from 'nexus'

export const AvilableDatesLogUpdateOneMutation = mutationField(
  'updateOneAvilableDatesLog',
  {
    type: nonNull('AvilableDatesLog'),
    args: {
      where: nonNull('AvilableDatesLogWhereUniqueInput'),
      data: nonNull('AvilableDatesLogUpdateInput'),
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
