import { mutationField, nonNull } from 'nexus'

export const InvPaymentTypeUpsertOneMutation = mutationField(
  'upsertOneInvPaymentType',
  {
    type: nonNull('InvPaymentType'),
    args: {
      where: nonNull('InvPaymentTypeWhereUniqueInput'),
      create: nonNull('InvPaymentTypeCreateInput'),
      update: nonNull('InvPaymentTypeUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.invPaymentType.upsert({
        ...args,
        ...select,
      })
    },
  },
)
