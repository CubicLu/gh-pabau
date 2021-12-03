import { queryField, nonNull, list } from 'nexus'

export const CmCouponClaimedFindCountQuery = queryField(
  'findManyCmCouponClaimedCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmCouponClaimedWhereInput',
      orderBy: list('CmCouponClaimedOrderByWithRelationInput'),
      cursor: 'CmCouponClaimedWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmCouponClaimedScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmCouponClaimed.count(args as any)
    },
  },
)
