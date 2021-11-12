import { mutationField, nonNull } from 'nexus'

export const CreditBalanceUpdateOneMutation = mutationField(
  'updateOneCreditBalance',
  {
    type: nonNull('CreditBalance'),
    args: {
      where: nonNull('CreditBalanceWhereUniqueInput'),
      data: nonNull('CreditBalanceUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.creditBalance.update({
        where,
        data,
        ...select,
      })
    },
  },
)
