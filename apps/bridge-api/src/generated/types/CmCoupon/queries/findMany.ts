import { queryField, nonNull, list } from 'nexus'

export const CmCouponFindManyQuery = queryField('findManyCmCoupon', {
  type: nonNull(list(nonNull('CmCoupon'))),
  args: {
    where: 'CmCouponWhereInput',
    orderBy: list('CmCouponOrderByInput'),
    cursor: 'CmCouponWhereUniqueInput',
    distinct: 'CmCouponScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCoupon.findMany({
      ...args,
      ...select,
    })
  },
})
