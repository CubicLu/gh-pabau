import { mutationField, nonNull } from 'nexus'

export const AccountManagerUpdateOneMutation = mutationField(
  'updateOneAccountManager',
  {
    type: nonNull('AccountManager'),
    args: {
      data: nonNull('AccountManagerUpdateInput'),
      where: nonNull('AccountManagerWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.accountManager.update({
        where,
        data,
        ...select,
      })
    },
  },
)
