import { queryField, list } from 'nexus'

export const CheckinProductFindFirstQuery = queryField(
  'findFirstCheckinProduct',
  {
    type: 'CheckinProduct',
    args: {
      where: 'CheckinProductWhereInput',
      orderBy: list('CheckinProductOrderByWithRelationInput'),
      cursor: 'CheckinProductWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CheckinProductScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.checkinProduct.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
