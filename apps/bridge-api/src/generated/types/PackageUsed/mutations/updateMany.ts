import { mutationField, nonNull } from 'nexus'

export const PackageUsedUpdateManyMutation = mutationField(
  'updateManyPackageUsed',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('PackageUsedUpdateManyMutationInput'),
      where: 'PackageUsedWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.packageUsed.updateMany(args as any)
    },
  },
)
