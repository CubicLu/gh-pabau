import { mutationField, nonNull } from 'nexus'

export const PackageUpdateOneMutation = mutationField('updateOnePackage', {
  type: nonNull('Package'),
  args: {
    where: nonNull('PackageWhereUniqueInput'),
    data: nonNull('PackageUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.package.update({
      where,
      data,
      ...select,
    })
  },
})
