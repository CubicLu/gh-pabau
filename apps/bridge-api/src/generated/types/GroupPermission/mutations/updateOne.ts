import { mutationField, nonNull } from 'nexus'

export const GroupPermissionUpdateOneMutation = mutationField(
  'updateOneGroupPermission',
  {
    type: nonNull('GroupPermission'),
    args: {
      data: nonNull('GroupPermissionUpdateInput'),
      where: nonNull('GroupPermissionWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.groupPermission.update({
        where,
        data,
        ...select,
      })
    },
  },
)
