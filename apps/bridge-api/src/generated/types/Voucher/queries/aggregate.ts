import { queryField, list } from 'nexus'

export const VoucherAggregateQuery = queryField('aggregateVoucher', {
  type: 'AggregateVoucher',
  args: {
    where: 'VoucherWhereInput',
    orderBy: list('VoucherOrderByInput'),
    cursor: 'VoucherWhereUniqueInput',
    distinct: 'VoucherScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.voucher.aggregate({ ...args, ...select }) as any
  },
})
