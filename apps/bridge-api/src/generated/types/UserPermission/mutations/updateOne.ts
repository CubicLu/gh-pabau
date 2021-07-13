import { mutationField, nonNull } from 'nexus'

export const UserPermissionUpdateOneMutation = mutationField(
  'updateOneUserPermission',
  {
    type: nonNull('UserPermission'),
    args: {
      where: nonNull('UserPermissionWhereUniqueInput'),
      data: nonNull('UserPermissionUpdateInput'),
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
