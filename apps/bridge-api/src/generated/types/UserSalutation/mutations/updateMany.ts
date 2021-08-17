import { mutationField, nonNull } from 'nexus'

export const UserSalutationUpdateManyMutation = mutationField(
  'updateManyUserSalutation',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'UserSalutationWhereInput',
      data: nonNull('UserSalutationUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userSalutation.updateMany(args as any)
    },
  },
)
