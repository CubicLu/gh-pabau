import { queryField, nonNull, list } from 'nexus'

export const CmCouponFindCountQuery = queryField('findManyCmCouponCount', {
  type: nonNull('Int'),
  args: {
    where: 'CmCouponWhereInput',
    orderBy: list('CmCouponOrderByInput'),
    cursor: 'CmCouponWhereUniqueInput',
    distinct: 'CmCouponScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmCoupon.count(args as any)
  },
})
