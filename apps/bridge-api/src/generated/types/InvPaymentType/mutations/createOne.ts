import { mutationField, nonNull } from 'nexus'

export const InvPaymentTypeCreateOneMutation = mutationField(
  'createOneInvPaymentType',
  {
    type: nonNull('InvPaymentType'),
    args: {
      data: nonNull('InvPaymentTypeCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.invPaymentType.create({
        data,
        ...select,
      })
    },
  },
)
