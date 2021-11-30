import { mutationField, nonNull } from 'nexus'

export const InvPaymentTypeUpdateManyMutation = mutationField(
  'updateManyInvPaymentType',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('InvPaymentTypeUpdateManyMutationInput'),
      where: 'InvPaymentTypeWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.invPaymentType.updateMany(args as any)
    },
  },
)
