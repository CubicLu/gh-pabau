import { mutationField, nonNull } from 'nexus'

export const CmCouponUpdateManyMutation = mutationField('updateManyCmCoupon', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('CmCouponUpdateManyMutationInput'),
    where: 'CmCouponWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmCoupon.updateMany(args as any)
  },
})
