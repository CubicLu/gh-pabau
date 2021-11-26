import { queryField, list } from 'nexus'

export const VoucherAggregateQuery = queryField('aggregateVoucher', {
  type: 'AggregateVoucher',
  args: {
    where: 'VoucherWhereInput',
    orderBy: list('VoucherOrderByWithRelationInput'),
    cursor: 'VoucherWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.voucher.aggregate({ ...args, ...select }) as any
  },
})
