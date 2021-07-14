import { mutationField, nonNull } from 'nexus'

export const UserAlertUpdateManyMutation = mutationField(
  'updateManyUserAlert',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'UserAlertWhereInput',
      data: nonNull('UserAlertUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userAlert.updateMany(args as any)
    },
  },
)
