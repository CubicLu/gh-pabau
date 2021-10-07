import { mutationField, nonNull } from 'nexus'

export const VoucherUpsertOneMutation = mutationField('upsertOneVoucher', {
  type: nonNull('Voucher'),
  args: {
    where: nonNull('VoucherWhereUniqueInput'),
    create: nonNull('VoucherCreateInput'),
    update: nonNull('VoucherUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.voucher.upsert({
      ...args,
      ...select,
    })
  },
})
