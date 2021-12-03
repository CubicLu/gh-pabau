import { mutationField, nonNull } from 'nexus'

export const UserAlertUpdateManyMutation = mutationField(
  'updateManyUserAlert',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('UserAlertUpdateManyMutationInput'),
      where: 'UserAlertWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userAlert.updateMany(args as any)
    },
  },
)
