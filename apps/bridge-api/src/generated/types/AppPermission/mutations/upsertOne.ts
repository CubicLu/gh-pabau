import { mutationField, nonNull } from 'nexus'

export const AppPermissionUpsertOneMutation = mutationField(
  'upsertOneAppPermission',
  {
    type: nonNull('AppPermission'),
    args: {
      where: nonNull('AppPermissionWhereUniqueInput'),
      create: nonNull('AppPermissionCreateInput'),
      update: nonNull('AppPermissionUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.appPermission.upsert({
        ...args,
        ...select,
      })
    },
  },
)
