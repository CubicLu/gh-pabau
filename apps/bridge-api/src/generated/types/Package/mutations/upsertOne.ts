import { mutationField, nonNull } from 'nexus'

export const PackageUpsertOneMutation = mutationField('upsertOnePackage', {
  type: nonNull('Package'),
  args: {
    where: nonNull('PackageWhereUniqueInput'),
    create: nonNull('PackageCreateInput'),
    update: nonNull('PackageUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.package.upsert({
      ...args,
      ...select,
    })
  },
})
