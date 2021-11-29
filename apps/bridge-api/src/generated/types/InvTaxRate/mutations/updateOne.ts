import { mutationField, nonNull } from 'nexus'

export const InvTaxRateUpdateOneMutation = mutationField(
  'updateOneInvTaxRate',
  {
    type: nonNull('InvTaxRate'),
    args: {
      data: nonNull('InvTaxRateUpdateInput'),
      where: nonNull('InvTaxRateWhereUniqueInput'),
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
