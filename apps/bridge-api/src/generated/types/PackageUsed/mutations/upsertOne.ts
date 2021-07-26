import { mutationField, nonNull } from 'nexus'

export const PackageUsedUpsertOneMutation = mutationField(
  'upsertOnePackageUsed',
  {
    type: nonNull('PackageUsed'),
    args: {
      where: nonNull('PackageUsedWhereUniqueInput'),
      create: nonNull('PackageUsedCreateInput'),
      update: nonNull('PackageUsedUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.packageUsed.upsert({
        ...args,
        ...select,
      })
    },
  },
)
