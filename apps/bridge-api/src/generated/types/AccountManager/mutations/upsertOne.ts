import { mutationField, nonNull } from 'nexus'

export const AccountManagerUpsertOneMutation = mutationField(
  'upsertOneAccountManager',
  {
    type: nonNull('AccountManager'),
    args: {
      where: nonNull('AccountManagerWhereUniqueInput'),
      create: nonNull('AccountManagerCreateInput'),
      update: nonNull('AccountManagerUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.accountManager.upsert({
        ...args,
        ...select,
      })
    },
  },
)
