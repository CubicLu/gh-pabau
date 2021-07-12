import { mutationField, nonNull } from 'nexus'

export const AccountBalanceLogCreateOneMutation = mutationField(
  'createOneAccountBalanceLog',
  {
    type: nonNull('AccountBalanceLog'),
    args: {
      data: nonNull('AccountBalanceLogCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.accountBalanceLog.create({
        data,
        ...select,
      })
    },
  },
)
