import { queryField, list } from 'nexus'

export const CalRangeRequestFindFirstQuery = queryField(
  'findFirstCalRangeRequest',
  {
    type: 'CalRangeRequest',
    args: {
      where: 'CalRangeRequestWhereInput',
      orderBy: list('CalRangeRequestOrderByWithRelationInput'),
      cursor: 'CalRangeRequestWhereUniqueInput',
      distinct: 'CalRangeRequestScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.calRangeRequest.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
