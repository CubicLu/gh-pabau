import { mutationField, nonNull } from 'nexus'

export const AvilableDatesLogCreateOneMutation = mutationField(
  'createOneAvilableDatesLog',
  {
    type: nonNull('AvilableDatesLog'),
    args: {
      data: nonNull('AvilableDatesLogCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.avilableDatesLog.create({
        data,
        ...select,
      })
    },
  },
)
