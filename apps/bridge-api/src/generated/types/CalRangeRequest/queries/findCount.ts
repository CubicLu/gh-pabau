import { queryField, nonNull, list } from 'nexus'

export const CalRangeRequestFindCountQuery = queryField(
  'findManyCalRangeRequestCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CalRangeRequestWhereInput',
      orderBy: list('CalRangeRequestOrderByWithRelationInput'),
      cursor: 'CalRangeRequestWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CalRangeRequestScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.calRangeRequest.count(args as any)
    },
  },
)
