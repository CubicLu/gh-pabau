import { mutationField, nonNull } from 'nexus'

export const ClockinTimesheetDeleteOneMutation = mutationField(
  'deleteOneClockinTimesheet',
  {
    type: 'ClockinTimesheet',
    args: {
      where: nonNull('ClockinTimesheetWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.clockinTimesheet.delete({
        where,
        ...select,
      })
    },
  },
)
