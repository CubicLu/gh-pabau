import { queryField, list } from 'nexus'

export const CmCouponAggregateQuery = queryField('aggregateCmCoupon', {
  type: 'AggregateCmCoupon',
  args: {
    where: 'CmCouponWhereInput',
    orderBy: list('CmCouponOrderByInput'),
    cursor: 'CmCouponWhereUniqueInput',
    distinct: 'CmCouponScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCoupon.aggregate({ ...args, ...select }) as any
  },
})
