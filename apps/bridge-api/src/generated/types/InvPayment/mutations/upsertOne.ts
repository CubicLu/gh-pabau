import { mutationField, nonNull } from 'nexus'

export const InvPaymentUpsertOneMutation = mutationField(
  'upsertOneInvPayment',
  {
    type: nonNull('InvPayment'),
    args: {
      where: nonNull('InvPaymentWhereUniqueInput'),
      create: nonNull('InvPaymentCreateInput'),
      update: nonNull('InvPaymentUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.invPayment.upsert({
        ...args,
        ...select,
      })
    },
  },
)
