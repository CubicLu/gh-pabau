import { mutationField, nonNull } from 'nexus'

export const UserMobilePermissionUpdateOneMutation = mutationField(
  'updateOneUserMobilePermission',
  {
    type: nonNull('UserMobilePermission'),
    args: {
      where: nonNull('UserMobilePermissionWhereUniqueInput'),
      data: nonNull('UserMobilePermissionUpdateInput'),
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
