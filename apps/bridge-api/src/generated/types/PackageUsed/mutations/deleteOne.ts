import { mutationField, nonNull } from 'nexus'

export const PackageUsedDeleteOneMutation = mutationField(
  'deleteOnePackageUsed',
  {
    type: 'PackageUsed',
    args: {
      where: nonNull('PackageUsedWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.packageUsed.delete({
        where,
        ...select,
      })
    },
  },
)
