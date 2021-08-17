import { queryField, list } from 'nexus'

export const CmCouponClaimedFindFirstQuery = queryField(
  'findFirstCmCouponClaimed',
  {
    type: 'CmCouponClaimed',
    args: {
      where: 'CmCouponClaimedWhereInput',
      orderBy: list('CmCouponClaimedOrderByInput'),
      cursor: 'CmCouponClaimedWhereUniqueInput',
      distinct: 'CmCouponClaimedScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmCouponClaimed.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
