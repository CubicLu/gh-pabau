import { queryField, nonNull, list } from 'nexus'

export const CmContactViewedFindManyQuery = queryField(
  'findManyCmContactViewed',
  {
    type: nonNull(list(nonNull('CmContactViewed'))),
    args: {
      where: 'CmContactViewedWhereInput',
      orderBy: list('CmContactViewedOrderByInput'),
      cursor: 'CmContactViewedWhereUniqueInput',
      distinct: 'CmContactViewedScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactViewed.findMany({
        ...args,
        ...select,
      })
    },
  },
)
