import { mutationField, nonNull } from 'nexus'

export const CmCouponUpdateManyMutation = mutationField('updateManyCmCoupon', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'CmCouponWhereInput',
    data: nonNull('CmCouponUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmCoupon.updateMany(args as any)
  },
})
