import { mutationField, nonNull } from 'nexus'

export const CreditBalanceUpdateOneMutation = mutationField(
  'updateOneCreditBalance',
  {
    type: nonNull('CreditBalance'),
    args: {
      data: nonNull('CreditBalanceUpdateInput'),
      where: nonNull('CreditBalanceWhereUniqueInput'),
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
