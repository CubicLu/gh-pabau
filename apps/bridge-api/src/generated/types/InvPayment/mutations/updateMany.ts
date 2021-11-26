import { mutationField, nonNull } from 'nexus'

export const InvPaymentUpdateManyMutation = mutationField(
  'updateManyInvPayment',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('InvPaymentUpdateManyMutationInput'),
      where: 'InvPaymentWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.invPayment.updateMany(args as any)
    },
  },
)
