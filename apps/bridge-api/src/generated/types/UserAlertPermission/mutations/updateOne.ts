import { mutationField, nonNull } from 'nexus'

export const UserAlertPermissionUpdateOneMutation = mutationField(
  'updateOneUserAlertPermission',
  {
    type: nonNull('UserAlertPermission'),
    args: {
      data: nonNull('UserAlertPermissionUpdateInput'),
      where: nonNull('UserAlertPermissionWhereUniqueInput'),
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
