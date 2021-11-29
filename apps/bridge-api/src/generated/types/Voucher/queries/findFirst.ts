import { queryField, list } from 'nexus'

export const VoucherFindFirstQuery = queryField('findFirstVoucher', {
  type: 'Voucher',
  args: {
    where: 'VoucherWhereInput',
    orderBy: list('VoucherOrderByWithRelationInput'),
    cursor: 'VoucherWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('VoucherScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.voucher.findFirst({
      ...args,
      ...select,
    })
  },
})
