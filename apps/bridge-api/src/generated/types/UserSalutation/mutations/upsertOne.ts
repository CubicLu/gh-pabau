import { mutationField, nonNull } from 'nexus'

export const UserSalutationUpsertOneMutation = mutationField(
  'upsertOneUserSalutation',
  {
    type: nonNull('UserSalutation'),
    args: {
      where: nonNull('UserSalutationWhereUniqueInput'),
      create: nonNull('UserSalutationCreateInput'),
      update: nonNull('UserSalutationUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userSalutation.upsert({
        ...args,
        ...select,
      })
    },
  },
)
