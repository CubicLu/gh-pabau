import { mutationField, nonNull } from 'nexus'

export const InvPaymentTypeUpdateOneMutation = mutationField(
  'updateOneInvPaymentType',
  {
    type: nonNull('InvPaymentType'),
    args: {
      where: nonNull('InvPaymentTypeWhereUniqueInput'),
      data: nonNull('InvPaymentTypeUpdateInput'),
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
