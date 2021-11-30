import { queryField, nonNull, list } from 'nexus'

export const VoucherFindManyQuery = queryField('findManyVoucher', {
  type: nonNull(list(nonNull('Voucher'))),
  args: {
    where: 'VoucherWhereInput',
    orderBy: list('VoucherOrderByWithRelationInput'),
    cursor: 'VoucherWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('VoucherScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.voucher.findMany({
      ...args,
      ...select,
    })
  },
})
