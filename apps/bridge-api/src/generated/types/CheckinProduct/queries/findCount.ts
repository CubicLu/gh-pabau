import { queryField, nonNull, list } from 'nexus'

export const CheckinProductFindCountQuery = queryField(
  'findManyCheckinProductCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CheckinProductWhereInput',
      orderBy: list('CheckinProductOrderByWithRelationInput'),
      cursor: 'CheckinProductWhereUniqueInput',
      distinct: 'CheckinProductScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.checkinProduct.count(args as any)
    },
  },
)
