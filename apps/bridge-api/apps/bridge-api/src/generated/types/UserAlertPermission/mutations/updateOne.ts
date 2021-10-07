import { mutationField, nonNull } from 'nexus'

export const UserAlertPermissionUpdateOneMutation = mutationField(
  'updateOneUserAlertPermission',
  {
    type: nonNull('UserAlertPermission'),
    args: {
      where: nonNull('UserAlertPermissionWhereUniqueInput'),
      data: nonNull('UserAlertPermissionUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.userAlertPermission.update({
        where,
        data,
        ...select,
      })
    },
  },
)
