import { queryField, nonNull, list } from 'nexus'

export const CmCouponClickFindCountQuery = queryField(
  'findManyCmCouponClickCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmCouponClickWhereInput',
      orderBy: list('CmCouponClickOrderByInput'),
      cursor: 'CmCouponClickWhereUniqueInput',
      distinct: 'CmCouponClickScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmCouponClick.count(args as any)
    },
  },
)
