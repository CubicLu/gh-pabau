import { mutationField, nonNull } from 'nexus'

export const VoucherUpdateOneMutation = mutationField('updateOneVoucher', {
  type: nonNull('Voucher'),
  args: {
    where: nonNull('VoucherWhereUniqueInput'),
    data: nonNull('VoucherUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.voucher.update({
      where,
      data,
      ...select,
    })
  },
})
