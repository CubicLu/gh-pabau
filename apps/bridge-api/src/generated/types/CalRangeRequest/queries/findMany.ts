import { queryField, nonNull, list } from 'nexus'

export const CalRangeRequestFindManyQuery = queryField(
  'findManyCalRangeRequest',
  {
    type: nonNull(list(nonNull('CalRangeRequest'))),
    args: {
      where: 'CalRangeRequestWhereInput',
      orderBy: list('CalRangeRequestOrderByInput'),
      cursor: 'CalRangeRequestWhereUniqueInput',
      distinct: 'CalRangeRequestScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.calRangeRequest.findMany({
        ...args,
        ...select,
      })
    },
  },
)
