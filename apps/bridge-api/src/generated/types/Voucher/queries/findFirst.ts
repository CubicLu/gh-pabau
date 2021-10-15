import { queryField, list } from 'nexus'

export const VoucherFindFirstQuery = queryField('findFirstVoucher', {
  type: 'Voucher',
  args: {
    where: 'VoucherWhereInput',
    orderBy: list('VoucherOrderByInput'),
    cursor: 'VoucherWhereUniqueInput',
    distinct: 'VoucherScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.voucher.findFirst({
      ...args,
      ...select,
    })
  },
})
