import { mutationField, nonNull } from 'nexus'

export const CalRangeRequestDeleteOneMutation = mutationField(
  'deleteOneCalRangeRequest',
  {
    type: 'CalRangeRequest',
    args: {
      where: nonNull('CalRangeRequestWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.calRangeRequest.delete({
        where,
        ...select,
      })
    },
  },
)
