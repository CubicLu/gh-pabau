import { queryField, nonNull } from 'nexus'

export const CmCouponFindUniqueQuery = queryField('findUniqueCmCoupon', {
  type: 'CmCoupon',
  args: {
    where: nonNull('CmCouponWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.cmCoupon.findUnique({
      where,
      ...select,
    })
  },
})
