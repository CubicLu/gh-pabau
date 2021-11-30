import { mutationField, nonNull } from 'nexus'

export const VoucherUpdateManyMutation = mutationField('updateManyVoucher', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('VoucherUpdateManyMutationInput'),
    where: 'VoucherWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.voucher.updateMany(args as any)
  },
})
