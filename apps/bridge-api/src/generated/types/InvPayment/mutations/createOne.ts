import { mutationField, nonNull } from 'nexus'

export const InvPaymentCreateOneMutation = mutationField(
  'createOneInvPayment',
  {
    type: nonNull('InvPayment'),
    args: {
      data: nonNull('InvPaymentCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.invPayment.create({
        data,
        ...select,
      })
    },
  },
)
