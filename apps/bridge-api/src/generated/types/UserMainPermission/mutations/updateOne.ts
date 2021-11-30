import { mutationField, nonNull } from 'nexus'

export const UserMainPermissionUpdateOneMutation = mutationField(
  'updateOneUserMainPermission',
  {
    type: nonNull('UserMainPermission'),
    args: {
      data: nonNull('UserMainPermissionUpdateInput'),
      where: nonNull('UserMainPermissionWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.userMainPermission.update({
        where,
        data,
        ...select,
      })
    },
  },
)
