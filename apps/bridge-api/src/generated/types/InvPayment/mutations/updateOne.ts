import { mutationField, nonNull } from 'nexus'

export const InvPaymentUpdateOneMutation = mutationField(
  'updateOneInvPayment',
  {
    type: nonNull('InvPayment'),
    args: {
      where: nonNull('InvPaymentWhereUniqueInput'),
      data: nonNull('InvPaymentUpdateInput'),
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
