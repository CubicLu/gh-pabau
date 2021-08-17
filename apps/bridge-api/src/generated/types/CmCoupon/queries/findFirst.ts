import { queryField, list } from 'nexus'

export const CmCouponFindFirstQuery = queryField('findFirstCmCoupon', {
  type: 'CmCoupon',
  args: {
    where: 'CmCouponWhereInput',
    orderBy: list('CmCouponOrderByInput'),
    cursor: 'CmCouponWhereUniqueInput',
    distinct: 'CmCouponScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCoupon.findFirst({
      ...args,
      ...select,
    })
  },
})
