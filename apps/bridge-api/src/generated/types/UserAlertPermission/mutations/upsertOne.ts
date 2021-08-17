import { mutationField, nonNull } from 'nexus'

export const UserAlertPermissionUpsertOneMutation = mutationField(
  'upsertOneUserAlertPermission',
  {
    type: nonNull('UserAlertPermission'),
    args: {
      where: nonNull('UserAlertPermissionWhereUniqueInput'),
      create: nonNull('UserAlertPermissionCreateInput'),
      update: nonNull('UserAlertPermissionUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userAlertPermission.upsert({
        ...args,
        ...select,
      })
    },
  },
)
