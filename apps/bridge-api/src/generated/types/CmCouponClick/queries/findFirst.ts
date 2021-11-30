import { queryField, list } from 'nexus'

export const CmCouponClickFindFirstQuery = queryField(
  'findFirstCmCouponClick',
  {
    type: 'CmCouponClick',
    args: {
      where: 'CmCouponClickWhereInput',
      orderBy: list('CmCouponClickOrderByWithRelationInput'),
      cursor: 'CmCouponClickWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmCouponClickScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmCouponClick.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
