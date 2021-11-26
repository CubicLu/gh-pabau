import { queryField, list } from 'nexus'

export const CmCouponAggregateQuery = queryField('aggregateCmCoupon', {
  type: 'AggregateCmCoupon',
  args: {
    where: 'CmCouponWhereInput',
    orderBy: list('CmCouponOrderByWithRelationInput'),
    cursor: 'CmCouponWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCoupon.aggregate({ ...args, ...select }) as any
  },
})
