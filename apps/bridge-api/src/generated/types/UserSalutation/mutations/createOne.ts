import { mutationField, nonNull } from 'nexus'

export const UserSalutationCreateOneMutation = mutationField(
  'createOneUserSalutation',
  {
    type: nonNull('UserSalutation'),
    args: {
      data: nonNull('UserSalutationCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.userSalutation.create({
        data,
        ...select,
      })
    },
  },
)
