import { queryField, nonNull, list } from 'nexus'

export const VoucherFindManyQuery = queryField('findManyVoucher', {
  type: nonNull(list(nonNull('Voucher'))),
  args: {
    where: 'VoucherWhereInput',
    orderBy: list('VoucherOrderByInput'),
    cursor: 'VoucherWhereUniqueInput',
    distinct: 'VoucherScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.voucher.findMany({
      ...args,
      ...select,
    })
  },
})
