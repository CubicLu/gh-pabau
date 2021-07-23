import { mutationField, nonNull } from 'nexus'

export const PackageUsedUpdateManyMutation = mutationField(
  'updateManyPackageUsed',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'PackageUsedWhereInput',
      data: nonNull('PackageUsedUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.packageUsed.updateMany(args as any)
    },
  },
)
