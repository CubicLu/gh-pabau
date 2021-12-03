import { mutationField, nonNull } from 'nexus'

export const CmCouponUpdateOneMutation = mutationField('updateOneCmCoupon', {
  type: nonNull('CmCoupon'),
  args: {
    data: nonNull('CmCouponUpdateInput'),
    where: nonNull('CmCouponWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.cmCoupon.update({
      where,
      data,
      ...select,
    })
  },
})
