import { mutationField, nonNull } from 'nexus'

export const UserPermissionCreateOneMutation = mutationField(
  'createOneUserPermission',
  {
    type: nonNull('UserPermission'),
    args: {
      data: nonNull('UserPermissionCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.userPermission.create({
        data,
        ...select,
      })
    },
  },
)
