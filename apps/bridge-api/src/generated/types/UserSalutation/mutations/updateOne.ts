import { mutationField, nonNull } from 'nexus'

export const UserSalutationUpdateOneMutation = mutationField(
  'updateOneUserSalutation',
  {
    type: nonNull('UserSalutation'),
    args: {
      where: nonNull('UserSalutationWhereUniqueInput'),
      data: nonNull('UserSalutationUpdateInput'),
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
