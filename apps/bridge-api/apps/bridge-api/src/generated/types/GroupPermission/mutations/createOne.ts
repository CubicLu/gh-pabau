import { mutationField, nonNull } from 'nexus'

export const GroupPermissionCreateOneMutation = mutationField(
  'createOneGroupPermission',
  {
    type: nonNull('GroupPermission'),
    args: {
      data: nonNull('GroupPermissionCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.groupPermission.create({
        data,
        ...select,
      })
    },
  },
)
