import { mutationField, nonNull } from 'nexus'

export const AccountManagerUpdateManyMutation = mutationField(
  'updateManyAccountManager',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AccountManagerWhereInput',
      data: nonNull('AccountManagerUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.accountManager.updateMany(args as any)
    },
  },
)
