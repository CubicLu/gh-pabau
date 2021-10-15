import { queryField, list } from 'nexus'

export const CmCouponClickAggregateQuery = queryField(
  'aggregateCmCouponClick',
  {
    type: 'AggregateCmCouponClick',
    args: {
      where: 'CmCouponClickWhereInput',
      orderBy: list('CmCouponClickOrderByInput'),
      cursor: 'CmCouponClickWhereUniqueInput',
      distinct: 'CmCouponClickScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmCouponClick.aggregate({ ...args, ...select }) as any
    },
  },
)
