import { queryField, list } from 'nexus'

export const CmCouponFindFirstQuery = queryField('findFirstCmCoupon', {
  type: 'CmCoupon',
  args: {
    where: 'CmCouponWhereInput',
    orderBy: list('CmCouponOrderByWithRelationInput'),
    cursor: 'CmCouponWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmCouponScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCoupon.findFirst({
      ...args,
      ...select,
    })
  },
})
