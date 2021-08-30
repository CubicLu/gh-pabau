import { queryField, list } from 'nexus'

export const CheckinProductFindFirstQuery = queryField(
  'findFirstCheckinProduct',
  {
    type: 'CheckinProduct',
    args: {
      where: 'CheckinProductWhereInput',
      orderBy: list('CheckinProductOrderByInput'),
      cursor: 'CheckinProductWhereUniqueInput',
      distinct: 'CheckinProductScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.checkinProduct.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
