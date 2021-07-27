import { mutationField, nonNull } from 'nexus'

export const PackageUsedUpdateOneMutation = mutationField(
  'updateOnePackageUsed',
  {
    type: nonNull('PackageUsed'),
    args: {
      where: nonNull('PackageUsedWhereUniqueInput'),
      data: nonNull('PackageUsedUpdateInput'),
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
