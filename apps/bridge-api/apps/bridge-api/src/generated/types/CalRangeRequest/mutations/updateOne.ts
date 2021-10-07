import { mutationField, nonNull } from 'nexus'

export const CalRangeRequestUpdateOneMutation = mutationField(
  'updateOneCalRangeRequest',
  {
    type: nonNull('CalRangeRequest'),
    args: {
      where: nonNull('CalRangeRequestWhereUniqueInput'),
      data: nonNull('CalRangeRequestUpdateInput'),
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
