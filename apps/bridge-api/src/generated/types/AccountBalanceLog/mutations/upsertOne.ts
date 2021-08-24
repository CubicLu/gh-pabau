import { mutationField, nonNull } from 'nexus'

export const AccountBalanceLogUpsertOneMutation = mutationField(
  'upsertOneAccountBalanceLog',
  {
    type: nonNull('AccountBalanceLog'),
    args: {
      where: nonNull('AccountBalanceLogWhereUniqueInput'),
      create: nonNull('AccountBalanceLogCreateInput'),
      update: nonNull('AccountBalanceLogUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.accountBalanceLog.upsert({
        ...args,
        ...select,
      })
    },
  },
)
