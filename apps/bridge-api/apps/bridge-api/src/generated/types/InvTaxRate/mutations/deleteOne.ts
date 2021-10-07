import { mutationField, nonNull } from 'nexus'

export const InvTaxRateDeleteOneMutation = mutationField(
  'deleteOneInvTaxRate',
  {
    type: 'InvTaxRate',
    args: {
      where: nonNull('InvTaxRateWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.invTaxRate.delete({
        where,
        ...select,
      })
    },
  },
)
