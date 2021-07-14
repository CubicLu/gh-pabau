import { queryField, nonNull } from 'nexus'

export const CheckinProductFindUniqueQuery = queryField(
  'findUniqueCheckinProduct',
  {
    type: 'CheckinProduct',
    args: {
      where: nonNull('CheckinProductWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.checkinProduct.findUnique({
        where,
        ...select,
      })
    },
  },
)
