import { mutationField, nonNull } from 'nexus'

export const VoucherUpdateOneMutation = mutationField('updateOneVoucher', {
  type: nonNull('Voucher'),
  args: {
    data: nonNull('VoucherUpdateInput'),
    where: nonNull('VoucherWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.voucher.update({
      where,
      data,
      ...select,
    })
  },
})
