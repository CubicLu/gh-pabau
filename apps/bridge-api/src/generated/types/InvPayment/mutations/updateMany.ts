import { mutationField, nonNull } from 'nexus'

export const InvPaymentUpdateManyMutation = mutationField(
  'updateManyInvPayment',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'InvPaymentWhereInput',
      data: nonNull('InvPaymentUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.invPayment.updateMany(args as any)
    },
  },
)
