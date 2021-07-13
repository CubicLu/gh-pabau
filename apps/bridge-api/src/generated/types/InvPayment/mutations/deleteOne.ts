import { mutationField, nonNull } from 'nexus'

export const InvPaymentDeleteOneMutation = mutationField(
  'deleteOneInvPayment',
  {
    type: 'InvPayment',
    args: {
      where: nonNull('InvPaymentWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.invPayment.delete({
        where,
        ...select,
      })
    },
  },
)
