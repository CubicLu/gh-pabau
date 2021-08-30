import { queryField, nonNull, list } from 'nexus'

export const CmCouponClaimedFindManyQuery = queryField(
  'findManyCmCouponClaimed',
  {
    type: nonNull(list(nonNull('CmCouponClaimed'))),
    args: {
      where: 'CmCouponClaimedWhereInput',
      orderBy: list('CmCouponClaimedOrderByInput'),
      cursor: 'CmCouponClaimedWhereUniqueInput',
      distinct: 'CmCouponClaimedScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmCouponClaimed.findMany({
        ...args,
        ...select,
      })
    },
  },
)
