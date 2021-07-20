import { mutationField, nonNull } from 'nexus'

export const AppPermissionUpdateOneMutation = mutationField(
  'updateOneAppPermission',
  {
    type: nonNull('AppPermission'),
    args: {
      where: nonNull('AppPermissionWhereUniqueInput'),
      data: nonNull('AppPermissionUpdateInput'),
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
