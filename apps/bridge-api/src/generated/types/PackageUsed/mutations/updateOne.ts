import { mutationField, nonNull } from 'nexus'

export const PackageUsedUpdateOneMutation = mutationField(
  'updateOnePackageUsed',
  {
    type: nonNull('PackageUsed'),
    args: {
      data: nonNull('PackageUsedUpdateInput'),
      where: nonNull('PackageUsedWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.packageUsed.update({
        where,
        data,
        ...select,
      })
    },
  },
)
