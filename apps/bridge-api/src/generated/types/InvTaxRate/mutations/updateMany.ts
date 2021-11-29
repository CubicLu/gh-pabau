import { mutationField, nonNull } from 'nexus'

export const InvTaxRateUpdateManyMutation = mutationField(
  'updateManyInvTaxRate',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('InvTaxRateUpdateManyMutationInput'),
      where: 'InvTaxRateWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.invTaxRate.updateMany(args as any)
    },
  },
)
