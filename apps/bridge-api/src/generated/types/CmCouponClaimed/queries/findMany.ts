import { queryField, nonNull, list } from 'nexus'

export const CmCouponClaimedFindManyQuery = queryField(
  'findManyCmCouponClaimed',
  {
    type: nonNull(list(nonNull('CmCouponClaimed'))),
    args: {
      where: 'CmCouponClaimedWhereInput',
      orderBy: list('CmCouponClaimedOrderByWithRelationInput'),
      cursor: 'CmCouponClaimedWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmCouponClaimedScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmCouponClaimed.findMany({
        ...args,
        ...select,
      })
    },
  },
)
