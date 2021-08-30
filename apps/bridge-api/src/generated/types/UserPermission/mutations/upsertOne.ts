import { mutationField, nonNull } from 'nexus'

export const UserPermissionUpsertOneMutation = mutationField(
  'upsertOneUserPermission',
  {
    type: nonNull('UserPermission'),
    args: {
      where: nonNull('UserPermissionWhereUniqueInput'),
      create: nonNull('UserPermissionCreateInput'),
      update: nonNull('UserPermissionUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userPermission.upsert({
        ...args,
        ...select,
      })
    },
  },
)
