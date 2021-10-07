import { mutationField, nonNull } from 'nexus'

export const CmCouponClaimedUpsertOneMutation = mutationField(
  'upsertOneCmCouponClaimed',
  {
    type: nonNull('CmCouponClaimed'),
    args: {
      where: nonNull('CmCouponClaimedWhereUniqueInput'),
      create: nonNull('CmCouponClaimedCreateInput'),
      update: nonNull('CmCouponClaimedUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmCouponClaimed.upsert({
        ...args,
        ...select,
      })
    },
  },
)
