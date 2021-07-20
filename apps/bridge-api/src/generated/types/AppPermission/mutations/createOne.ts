import { mutationField, nonNull } from 'nexus'

export const AppPermissionCreateOneMutation = mutationField(
  'createOneAppPermission',
  {
    type: nonNull('AppPermission'),
    args: {
      data: nonNull('AppPermissionCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.appPermission.create({
        data,
        ...select,
      })
    },
  },
)
