import { mutationField, nonNull } from 'nexus'

export const GroupPermissionUpsertOneMutation = mutationField(
  'upsertOneGroupPermission',
  {
    type: nonNull('GroupPermission'),
    args: {
      where: nonNull('GroupPermissionWhereUniqueInput'),
      create: nonNull('GroupPermissionCreateInput'),
      update: nonNull('GroupPermissionUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.groupPermission.upsert({
        ...args,
        ...select,
      })
    },
  },
)
