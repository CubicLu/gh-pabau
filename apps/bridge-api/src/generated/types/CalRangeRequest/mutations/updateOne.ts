import { mutationField, nonNull } from 'nexus'

export const CalRangeRequestUpdateOneMutation = mutationField(
  'updateOneCalRangeRequest',
  {
    type: nonNull('CalRangeRequest'),
    args: {
      data: nonNull('CalRangeRequestUpdateInput'),
      where: nonNull('CalRangeRequestWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.calRangeRequest.update({
        where,
        data,
        ...select,
      })
    },
  },
)
