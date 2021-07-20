import { mutationField, nonNull } from 'nexus'

export const GroupPermissionUpdateOneMutation = mutationField(
  'updateOneGroupPermission',
  {
    type: nonNull('GroupPermission'),
    args: {
      where: nonNull('GroupPermissionWhereUniqueInput'),
      data: nonNull('GroupPermissionUpdateInput'),
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
