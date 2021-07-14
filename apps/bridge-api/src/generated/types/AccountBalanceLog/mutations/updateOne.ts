import { mutationField, nonNull } from 'nexus'

export const AccountBalanceLogUpdateOneMutation = mutationField(
  'updateOneAccountBalanceLog',
  {
    type: nonNull('AccountBalanceLog'),
    args: {
      where: nonNull('AccountBalanceLogWhereUniqueInput'),
      data: nonNull('AccountBalanceLogUpdateInput'),
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
