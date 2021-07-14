import { mutationField, nonNull } from 'nexus'

export const InvTaxRateUpsertOneMutation = mutationField(
  'upsertOneInvTaxRate',
  {
    type: nonNull('InvTaxRate'),
    args: {
      where: nonNull('InvTaxRateWhereUniqueInput'),
      create: nonNull('InvTaxRateCreateInput'),
      update: nonNull('InvTaxRateUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.invTaxRate.upsert({
        ...args,
        ...select,
      })
    },
  },
)
