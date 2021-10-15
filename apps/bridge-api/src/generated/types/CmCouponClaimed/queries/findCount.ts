import { queryField, nonNull, list } from 'nexus'

export const CmCouponClaimedFindCountQuery = queryField(
  'findManyCmCouponClaimedCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmCouponClaimedWhereInput',
      orderBy: list('CmCouponClaimedOrderByInput'),
      cursor: 'CmCouponClaimedWhereUniqueInput',
      distinct: 'CmCouponClaimedScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmCouponClaimed.count(args as any)
    },
  },
)
