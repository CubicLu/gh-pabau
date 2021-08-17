import { mutationField, nonNull } from 'nexus'

export const InvPaymentTypeDeleteOneMutation = mutationField(
  'deleteOneInvPaymentType',
  {
    type: 'InvPaymentType',
    args: {
      where: nonNull('InvPaymentTypeWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.invPaymentType.delete({
        where,
        ...select,
      })
    },
  },
)
