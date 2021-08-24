import { mutationField, nonNull } from 'nexus'

export const UserMainPermissionCreateOneMutation = mutationField(
  'createOneUserMainPermission',
  {
    type: nonNull('UserMainPermission'),
    args: {
      data: nonNull('UserMainPermissionCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.userMainPermission.create({
        data,
        ...select,
      })
    },
  },
)
