import { queryField, list } from 'nexus'

export const CmContactViewedFindFirstQuery = queryField(
  'findFirstCmContactViewed',
  {
    type: 'CmContactViewed',
    args: {
      where: 'CmContactViewedWhereInput',
      orderBy: list('CmContactViewedOrderByWithRelationInput'),
      cursor: 'CmContactViewedWhereUniqueInput',
      distinct: 'CmContactViewedScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactViewed.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
