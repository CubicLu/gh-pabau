import { queryField, nonNull } from 'nexus'

export const VoucherFindUniqueQuery = queryField('findUniqueVoucher', {
  type: 'Voucher',
  args: {
    where: nonNull('VoucherWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.voucher.findUnique({
      where,
      ...select,
    })
  },
})
