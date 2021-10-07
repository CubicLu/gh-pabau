import { queryField, nonNull } from 'nexus'

export const CalRangeRequestFindUniqueQuery = queryField(
  'findUniqueCalRangeRequest',
  {
    type: 'CalRangeRequest',
    args: {
      where: nonNull('CalRangeRequestWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.calRangeRequest.findUnique({
        where,
        ...select,
      })
    },
  },
)
