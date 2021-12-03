import { queryField, nonNull, list } from 'nexus'

export const CmCouponClickFindManyQuery = queryField('findManyCmCouponClick', {
  type: nonNull(list(nonNull('CmCouponClick'))),
  args: {
    where: 'CmCouponClickWhereInput',
    orderBy: list('CmCouponClickOrderByWithRelationInput'),
    cursor: 'CmCouponClickWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmCouponClickScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCouponClick.findMany({
      ...args,
      ...select,
    })
  },
})
