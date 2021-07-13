import { mutationField, nonNull } from 'nexus'

export const UserSalutationDeleteOneMutation = mutationField(
  'deleteOneUserSalutation',
  {
    type: 'UserSalutation',
    args: {
      where: nonNull('UserSalutationWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.userSalutation.delete({
        where,
        ...select,
      })
    },
  },
)
