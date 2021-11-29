import { mutationField, nonNull } from 'nexus'

export const CmCouponClaimedUpdateOneMutation = mutationField(
  'updateOneCmCouponClaimed',
  {
    type: nonNull('CmCouponClaimed'),
    args: {
      data: nonNull('CmCouponClaimedUpdateInput'),
      where: nonNull('CmCouponClaimedWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmCouponClaimed.update({
        where,
        data,
        ...select,
      })
    },
  },
)
