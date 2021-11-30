import { mutationField, nonNull } from 'nexus'

export const PackageUpdateOneMutation = mutationField('updateOnePackage', {
  type: nonNull('Package'),
  args: {
    data: nonNull('PackageUpdateInput'),
    where: nonNull('PackageWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.package.update({
      where,
      data,
      ...select,
    })
  },
})
