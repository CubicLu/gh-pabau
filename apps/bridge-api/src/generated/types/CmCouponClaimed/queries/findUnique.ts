import { queryField, nonNull } from 'nexus'

export const CmCouponClaimedFindUniqueQuery = queryField(
  'findUniqueCmCouponClaimed',
  {
    type: 'CmCouponClaimed',
    args: {
      where: nonNull('CmCouponClaimedWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cmCouponClaimed.findUnique({
        where,
        ...select,
      })
    },
  },
)
