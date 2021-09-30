import { mutationField, nonNull } from 'nexus'

export const VoucherUpdateManyMutation = mutationField('updateManyVoucher', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'VoucherWhereInput',
    data: nonNull('VoucherUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.voucher.updateMany(args as any)
  },
})
