import { queryField, list } from 'nexus'

export const CmCouponClaimedAggregateQuery = queryField(
  'aggregateCmCouponClaimed',
  {
    type: 'AggregateCmCouponClaimed',
    args: {
      where: 'CmCouponClaimedWhereInput',
      orderBy: list('CmCouponClaimedOrderByWithRelationInput'),
      cursor: 'CmCouponClaimedWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmCouponClaimed.aggregate({ ...args, ...select }) as any
    },
  },
)
