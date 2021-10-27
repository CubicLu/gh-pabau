import { mutationField, nonNull } from 'nexus'

export const PackageUpdateManyMutation = mutationField('updateManyPackage', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'PackageWhereInput',
    data: nonNull('PackageUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.package.updateMany(args as any)
  },
})
