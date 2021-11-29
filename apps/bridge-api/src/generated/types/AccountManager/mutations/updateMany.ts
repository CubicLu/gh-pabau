import { mutationField, nonNull } from 'nexus'

export const AccountManagerUpdateManyMutation = mutationField(
  'updateManyAccountManager',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AccountManagerUpdateManyMutationInput'),
      where: 'AccountManagerWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.accountManager.updateMany(args as any)
    },
  },
)
