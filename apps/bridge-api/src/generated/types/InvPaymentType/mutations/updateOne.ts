import { mutationField, nonNull } from 'nexus'

export const InvPaymentTypeUpdateOneMutation = mutationField(
  'updateOneInvPaymentType',
  {
    type: nonNull('InvPaymentType'),
    args: {
      data: nonNull('InvPaymentTypeUpdateInput'),
      where: nonNull('InvPaymentTypeWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.invPaymentType.update({
        where,
        data,
        ...select,
      })
    },
  },
)
