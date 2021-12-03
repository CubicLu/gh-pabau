import { queryField, nonNull, list } from 'nexus'

export const CalRangeRequestFindManyQuery = queryField(
  'findManyCalRangeRequest',
  {
    type: nonNull(list(nonNull('CalRangeRequest'))),
    args: {
      where: 'CalRangeRequestWhereInput',
      orderBy: list('CalRangeRequestOrderByWithRelationInput'),
      cursor: 'CalRangeRequestWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CalRangeRequestScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.calRangeRequest.findMany({
        ...args,
        ...select,
      })
    },
  },
)
