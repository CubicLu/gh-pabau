import { mutationField, nonNull } from 'nexus'

export const UserMainPermissionUpsertOneMutation = mutationField(
  'upsertOneUserMainPermission',
  {
    type: nonNull('UserMainPermission'),
    args: {
      where: nonNull('UserMainPermissionWhereUniqueInput'),
      create: nonNull('UserMainPermissionCreateInput'),
      update: nonNull('UserMainPermissionUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userMainPermission.upsert({
        ...args,
        ...select,
      })
    },
  },
)
