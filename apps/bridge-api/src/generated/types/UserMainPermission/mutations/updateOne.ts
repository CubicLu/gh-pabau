import { mutationField, nonNull } from 'nexus'

export const UserMainPermissionUpdateOneMutation = mutationField(
  'updateOneUserMainPermission',
  {
    type: nonNull('UserMainPermission'),
    args: {
      where: nonNull('UserMainPermissionWhereUniqueInput'),
      data: nonNull('UserMainPermissionUpdateInput'),
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
