import { queryField, list } from 'nexus'

export const CmCouponClickAggregateQuery = queryField(
  'aggregateCmCouponClick',
  {
    type: 'AggregateCmCouponClick',
    args: {
      where: 'CmCouponClickWhereInput',
      orderBy: list('CmCouponClickOrderByWithRelationInput'),
      cursor: 'CmCouponClickWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmCouponClick.aggregate({ ...args, ...select }) as any
    },
  },
)
