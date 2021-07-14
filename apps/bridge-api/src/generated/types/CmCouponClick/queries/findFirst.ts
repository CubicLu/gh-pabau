import { queryField, list } from 'nexus'

export const CmCouponClickFindFirstQuery = queryField(
  'findFirstCmCouponClick',
  {
    type: 'CmCouponClick',
    args: {
      where: 'CmCouponClickWhereInput',
      orderBy: list('CmCouponClickOrderByInput'),
      cursor: 'CmCouponClickWhereUniqueInput',
      distinct: 'CmCouponClickScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmCouponClick.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
