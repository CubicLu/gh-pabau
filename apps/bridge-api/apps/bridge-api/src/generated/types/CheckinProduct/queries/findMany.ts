import { queryField, nonNull, list } from 'nexus'

export const CheckinProductFindManyQuery = queryField(
  'findManyCheckinProduct',
  {
    type: nonNull(list(nonNull('CheckinProduct'))),
    args: {
      where: 'CheckinProductWhereInput',
      orderBy: list('CheckinProductOrderByWithRelationInput'),
      cursor: 'CheckinProductWhereUniqueInput',
      distinct: 'CheckinProductScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.checkinProduct.findMany({
        ...args,
        ...select,
      })
    },
  },
)
