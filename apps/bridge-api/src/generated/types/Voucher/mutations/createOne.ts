import { mutationField, nonNull } from 'nexus'

export const VoucherCreateOneMutation = mutationField('createOneVoucher', {
  type: nonNull('Voucher'),
  args: {
    data: nonNull('VoucherCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.voucher.create({
      data,
      ...select,
    })
  },
})
