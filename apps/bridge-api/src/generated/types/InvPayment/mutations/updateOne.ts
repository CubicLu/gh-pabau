import { mutationField, nonNull } from 'nexus'

export const InvPaymentUpdateOneMutation = mutationField(
  'updateOneInvPayment',
  {
    type: nonNull('InvPayment'),
    args: {
      data: nonNull('InvPaymentUpdateInput'),
      where: nonNull('InvPaymentWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.invPayment.update({
        where,
        data,
        ...select,
      })
    },
  },
)
