import { mutationField, nonNull } from 'nexus'

export const UserAlertPermissionCreateOneMutation = mutationField(
  'createOneUserAlertPermission',
  {
    type: nonNull('UserAlertPermission'),
    args: {
      data: nonNull('UserAlertPermissionCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.userAlertPermission.create({
        data,
        ...select,
      })
    },
  },
)
