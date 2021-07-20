import { mutationField, nonNull } from 'nexus'

export const CmCouponClaimedUpdateOneMutation = mutationField(
  'updateOneCmCouponClaimed',
  {
    type: nonNull('CmCouponClaimed'),
    args: {
      where: nonNull('CmCouponClaimedWhereUniqueInput'),
      data: nonNull('CmCouponClaimedUpdateInput'),
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
