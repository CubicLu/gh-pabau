import { mutationField, nonNull } from 'nexus'

export const InvTaxRateCreateOneMutation = mutationField(
  'createOneInvTaxRate',
  {
    type: nonNull('InvTaxRate'),
    args: {
      data: nonNull('InvTaxRateCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.invTaxRate.create({
        data,
        ...select,
      })
    },
  },
)
