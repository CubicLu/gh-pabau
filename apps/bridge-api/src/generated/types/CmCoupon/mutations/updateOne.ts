import { mutationField, nonNull } from 'nexus'

export const CmCouponUpdateOneMutation = mutationField('updateOneCmCoupon', {
  type: nonNull('CmCoupon'),
  args: {
    where: nonNull('CmCouponWhereUniqueInput'),
    data: nonNull('CmCouponUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.cmCoupon.update({
      where,
      data,
      ...select,
    })
  },
})
