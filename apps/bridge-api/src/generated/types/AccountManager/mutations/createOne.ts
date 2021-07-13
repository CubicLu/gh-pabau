import { mutationField, nonNull } from 'nexus'

export const AccountManagerCreateOneMutation = mutationField(
  'createOneAccountManager',
  {
    type: nonNull('AccountManager'),
    args: {
      data: nonNull('AccountManagerCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.accountManager.create({
        data,
        ...select,
      })
    },
  },
)
