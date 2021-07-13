import { mutationField, nonNull } from 'nexus'

export const AccountManagerUpdateOneMutation = mutationField(
  'updateOneAccountManager',
  {
    type: nonNull('AccountManager'),
    args: {
      where: nonNull('AccountManagerWhereUniqueInput'),
      data: nonNull('AccountManagerUpdateInput'),
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
