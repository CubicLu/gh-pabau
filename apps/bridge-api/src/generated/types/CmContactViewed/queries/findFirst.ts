import { queryField, list } from 'nexus'

export const CmContactViewedFindFirstQuery = queryField(
  'findFirstCmContactViewed',
  {
    type: 'CmContactViewed',
    args: {
      where: 'CmContactViewedWhereInput',
      orderBy: list('CmContactViewedOrderByWithRelationInput'),
      cursor: 'CmContactViewedWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmContactViewedScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactViewed.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
