import { mutationField, nonNull } from 'nexus'

export const InvTaxRateUpdateManyMutation = mutationField(
  'updateManyInvTaxRate',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'InvTaxRateWhereInput',
      data: nonNull('InvTaxRateUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.invTaxRate.updateMany(args as any)
    },
  },
)
