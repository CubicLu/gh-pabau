import { queryField, nonNull, list } from 'nexus'

export const CmCouponFindManyQuery = queryField('findManyCmCoupon', {
  type: nonNull(list(nonNull('CmCoupon'))),
  args: {
    where: 'CmCouponWhereInput',
    orderBy: list('CmCouponOrderByWithRelationInput'),
    cursor: 'CmCouponWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmCouponScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCoupon.findMany({
      ...args,
      ...select,
    })
  },
})
