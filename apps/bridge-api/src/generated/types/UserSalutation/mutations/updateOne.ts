import { mutationField, nonNull } from 'nexus'

export const UserSalutationUpdateOneMutation = mutationField(
  'updateOneUserSalutation',
  {
    type: nonNull('UserSalutation'),
    args: {
      data: nonNull('UserSalutationUpdateInput'),
      where: nonNull('UserSalutationWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.userSalutation.update({
        where,
        data,
        ...select,
      })
    },
  },
)
