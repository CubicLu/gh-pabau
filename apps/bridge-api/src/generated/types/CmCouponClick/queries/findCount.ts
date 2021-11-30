import { queryField, nonNull, list } from 'nexus'

export const CmCouponClickFindCountQuery = queryField(
  'findManyCmCouponClickCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmCouponClickWhereInput',
      orderBy: list('CmCouponClickOrderByWithRelationInput'),
      cursor: 'CmCouponClickWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmCouponClickScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmCouponClick.count(args as any)
    },
  },
)
