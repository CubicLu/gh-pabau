import { queryField, nonNull } from 'nexus'

export const CmCouponClickFindUniqueQuery = queryField(
  'findUniqueCmCouponClick',
  {
    type: 'CmCouponClick',
    args: {
      where: nonNull('CmCouponClickWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cmCouponClick.findUnique({
        where,
        ...select,
      })
    },
  },
)
