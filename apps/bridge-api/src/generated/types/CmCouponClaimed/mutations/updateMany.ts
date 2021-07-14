import { mutationField, nonNull } from 'nexus'

export const CmCouponClaimedUpdateManyMutation = mutationField(
  'updateManyCmCouponClaimed',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmCouponClaimedWhereInput',
      data: nonNull('CmCouponClaimedUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmCouponClaimed.updateMany(args as any)
    },
  },
)
