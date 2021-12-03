import { mutationField, nonNull } from 'nexus'

export const UserMobilePermissionUpdateOneMutation = mutationField(
  'updateOneUserMobilePermission',
  {
    type: nonNull('UserMobilePermission'),
    args: {
      data: nonNull('UserMobilePermissionUpdateInput'),
      where: nonNull('UserMobilePermissionWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.userMobilePermission.update({
        where,
        data,
        ...select,
      })
    },
  },
)
