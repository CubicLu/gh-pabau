import { mutationField, nonNull } from 'nexus'

export const CreditBalanceUpsertOneMutation = mutationField(
  'upsertOneCreditBalance',
  {
    type: nonNull('CreditBalance'),
    args: {
      where: nonNull('CreditBalanceWhereUniqueInput'),
      create: nonNull('CreditBalanceCreateInput'),
      update: nonNull('CreditBalanceUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.creditBalance.upsert({
        ...args,
        ...select,
      })
    },
  },
)
