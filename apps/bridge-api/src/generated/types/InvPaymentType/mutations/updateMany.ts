import { mutationField, nonNull } from 'nexus'

export const InvPaymentTypeUpdateManyMutation = mutationField(
  'updateManyInvPaymentType',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'InvPaymentTypeWhereInput',
      data: nonNull('InvPaymentTypeUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.invPaymentType.updateMany(args as any)
    },
  },
)
