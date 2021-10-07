import { mutationField, nonNull } from 'nexus'

export const UserMobilePermissionCreateOneMutation = mutationField(
  'createOneUserMobilePermission',
  {
    type: nonNull('UserMobilePermission'),
    args: {
      data: nonNull('UserMobilePermissionCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.userMobilePermission.create({
        data,
        ...select,
      })
    },
  },
)
