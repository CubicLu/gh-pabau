import { mutationField, nonNull } from 'nexus'

export const UserAlertTypeUpdateManyMutation = mutationField(
  'updateManyUserAlertType',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('UserAlertTypeUpdateManyMutationInput'),
      where: 'UserAlertTypeWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userAlertType.updateMany(args as any)
    },
  },
)
