import { mutationField, nonNull } from 'nexus'

export const UserSalutationUpdateManyMutation = mutationField(
  'updateManyUserSalutation',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('UserSalutationUpdateManyMutationInput'),
      where: 'UserSalutationWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userSalutation.updateMany(args as any)
    },
  },
)
