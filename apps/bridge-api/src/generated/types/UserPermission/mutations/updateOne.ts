import { mutationField, nonNull } from 'nexus'

export const UserPermissionUpdateOneMutation = mutationField(
  'updateOneUserPermission',
  {
    type: nonNull('UserPermission'),
    args: {
      data: nonNull('UserPermissionUpdateInput'),
      where: nonNull('UserPermissionWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.userPermission.update({
        where,
        data,
        ...select,
      })
    },
  },
)
