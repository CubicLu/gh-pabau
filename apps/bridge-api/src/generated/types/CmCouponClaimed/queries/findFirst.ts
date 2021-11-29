import { queryField, list } from 'nexus'

export const CmCouponClaimedFindFirstQuery = queryField(
  'findFirstCmCouponClaimed',
  {
    type: 'CmCouponClaimed',
    args: {
      where: 'CmCouponClaimedWhereInput',
      orderBy: list('CmCouponClaimedOrderByWithRelationInput'),
      cursor: 'CmCouponClaimedWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmCouponClaimedScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmCouponClaimed.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
