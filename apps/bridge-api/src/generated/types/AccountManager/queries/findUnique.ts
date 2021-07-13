import { queryField, nonNull } from 'nexus'

export const AccountManagerFindUniqueQuery = queryField(
  'findUniqueAccountManager',
  {
    type: 'AccountManager',
    args: {
      where: nonNull('AccountManagerWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.accountManager.findUnique({
        where,
        ...select,
      })
    },
  },
)
