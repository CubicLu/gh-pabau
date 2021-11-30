import { queryField, nonNull, list } from 'nexus'

export const CheckinProductFindManyQuery = queryField(
  'findManyCheckinProduct',
  {
    type: nonNull(list(nonNull('CheckinProduct'))),
    args: {
      where: 'CheckinProductWhereInput',
      orderBy: list('CheckinProductOrderByWithRelationInput'),
      cursor: 'CheckinProductWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CheckinProductScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.checkinProduct.findMany({
        ...args,
        ...select,
      })
    },
  },
)
