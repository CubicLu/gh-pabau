import { mutationField, nonNull } from 'nexus'

export const AccountBalanceLogUpdateOneMutation = mutationField(
  'updateOneAccountBalanceLog',
  {
    type: nonNull('AccountBalanceLog'),
    args: {
      data: nonNull('AccountBalanceLogUpdateInput'),
      where: nonNull('AccountBalanceLogWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.accountBalanceLog.update({
        where,
        data,
        ...select,
      })
    },
  },
)
