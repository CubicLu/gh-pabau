import { mutationField, nonNull } from 'nexus'

export const CmCouponClaimedUpdateManyMutation = mutationField(
  'updateManyCmCouponClaimed',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CmCouponClaimedUpdateManyMutationInput'),
      where: 'CmCouponClaimedWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmCouponClaimed.updateMany(args as any)
    },
  },
)
