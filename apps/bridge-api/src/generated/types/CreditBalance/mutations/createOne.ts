import { mutationField, nonNull } from 'nexus'

export const CreditBalanceCreateOneMutation = mutationField(
  'createOneCreditBalance',
  {
    type: nonNull('CreditBalance'),
    args: {
      data: nonNull('CreditBalanceCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.creditBalance.create({
        data,
        ...select,
      })
    },
  },
)
