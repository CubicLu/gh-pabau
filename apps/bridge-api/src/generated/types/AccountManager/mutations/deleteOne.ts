import { mutationField, nonNull } from 'nexus'

export const AccountManagerDeleteOneMutation = mutationField(
  'deleteOneAccountManager',
  {
    type: 'AccountManager',
    args: {
      where: nonNull('AccountManagerWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.accountManager.delete({
        where,
        ...select,
      })
    },
  },
)
