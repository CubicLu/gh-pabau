import { queryField, nonNull, list } from 'nexus'

export const CalRangeRequestFindCountQuery = queryField(
  'findManyCalRangeRequestCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CalRangeRequestWhereInput',
      orderBy: list('CalRangeRequestOrderByWithRelationInput'),
      cursor: 'CalRangeRequestWhereUniqueInput',
      distinct: 'CalRangeRequestScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.calRangeRequest.count(args as any)
    },
  },
)
