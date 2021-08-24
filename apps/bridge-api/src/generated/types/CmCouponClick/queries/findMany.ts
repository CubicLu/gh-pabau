import { queryField, nonNull, list } from 'nexus'

export const CmCouponClickFindManyQuery = queryField('findManyCmCouponClick', {
  type: nonNull(list(nonNull('CmCouponClick'))),
  args: {
    where: 'CmCouponClickWhereInput',
    orderBy: list('CmCouponClickOrderByInput'),
    cursor: 'CmCouponClickWhereUniqueInput',
    distinct: 'CmCouponClickScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCouponClick.findMany({
      ...args,
      ...select,
    })
  },
})
