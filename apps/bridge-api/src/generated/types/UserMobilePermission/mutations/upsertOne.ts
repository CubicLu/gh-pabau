import { mutationField, nonNull } from 'nexus'

export const UserMobilePermissionUpsertOneMutation = mutationField(
  'upsertOneUserMobilePermission',
  {
    type: nonNull('UserMobilePermission'),
    args: {
      where: nonNull('UserMobilePermissionWhereUniqueInput'),
      create: nonNull('UserMobilePermissionCreateInput'),
      update: nonNull('UserMobilePermissionUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userMobilePermission.upsert({
        ...args,
        ...select,
      })
    },
  },
)
