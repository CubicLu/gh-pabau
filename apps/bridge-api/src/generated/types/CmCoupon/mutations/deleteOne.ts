import { mutationField, nonNull } from 'nexus'

export const CmCouponDeleteOneMutation = mutationField('deleteOneCmCoupon', {
  type: 'CmCoupon',
  args: {
    where: nonNull('CmCouponWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.cmCoupon.delete({
      where,
      ...select,
    })
  },
})
