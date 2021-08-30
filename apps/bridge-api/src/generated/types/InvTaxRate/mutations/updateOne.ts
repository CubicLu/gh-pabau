import { mutationField, nonNull } from 'nexus'

export const InvTaxRateUpdateOneMutation = mutationField(
  'updateOneInvTaxRate',
  {
    type: nonNull('InvTaxRate'),
    args: {
      where: nonNull('InvTaxRateWhereUniqueInput'),
      data: nonNull('InvTaxRateUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.invTaxRate.update({
        where,
        data,
        ...select,
      })
    },
  },
)
