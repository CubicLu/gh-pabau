import { queryField, nonNull, list } from 'nexus'

export const CmCouponFindCountQuery = queryField('findManyCmCouponCount', {
  type: nonNull('Int'),
  args: {
    where: 'CmCouponWhereInput',
    orderBy: list('CmCouponOrderByWithRelationInput'),
    cursor: 'CmCouponWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmCouponScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmCoupon.count(args as any)
  },
})
