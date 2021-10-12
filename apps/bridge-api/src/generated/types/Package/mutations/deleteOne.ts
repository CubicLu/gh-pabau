import { mutationField, nonNull } from 'nexus'

export const PackageDeleteOneMutation = mutationField('deleteOnePackage', {
  type: 'Package',
  args: {
    where: nonNull('PackageWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.package.delete({
      where,
      ...select,
    })
  },
})
