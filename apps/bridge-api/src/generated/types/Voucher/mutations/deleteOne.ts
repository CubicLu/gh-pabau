import { mutationField, nonNull } from 'nexus'

export const VoucherDeleteOneMutation = mutationField('deleteOneVoucher', {
  type: 'Voucher',
  args: {
    where: nonNull('VoucherWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.voucher.delete({
      where,
      ...select,
    })
  },
})
