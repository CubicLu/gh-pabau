import { mutationField, nonNull } from 'nexus'

export const AppPermissionUpdateOneMutation = mutationField(
  'updateOneAppPermission',
  {
    type: nonNull('AppPermission'),
    args: {
      data: nonNull('AppPermissionUpdateInput'),
      where: nonNull('AppPermissionWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.appPermission.update({
        where,
        data,
        ...select,
      })
    },
  },
)
