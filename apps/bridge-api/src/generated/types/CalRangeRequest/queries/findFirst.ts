import { queryField, list } from 'nexus'

export const CalRangeRequestFindFirstQuery = queryField(
  'findFirstCalRangeRequest',
  {
    type: 'CalRangeRequest',
    args: {
      where: 'CalRangeRequestWhereInput',
      orderBy: list('CalRangeRequestOrderByWithRelationInput'),
      cursor: 'CalRangeRequestWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CalRangeRequestScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.calRangeRequest.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
