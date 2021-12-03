import { mutationField, nonNull } from 'nexus'

export const PackageUpdateManyMutation = mutationField('updateManyPackage', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('PackageUpdateManyMutationInput'),
    where: 'PackageWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.package.updateMany(args as any)
  },
})
