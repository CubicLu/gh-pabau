import { mutationField, nonNull } from 'nexus'

export const UserAlertTypeUpdateManyMutation = mutationField(
  'updateManyUserAlertType',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'UserAlertTypeWhereInput',
      data: nonNull('UserAlertTypeUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userAlertType.updateMany(args as any)
    },
  },
)
