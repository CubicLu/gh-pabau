import { queryField, nonNull } from 'nexus'

export const PackageFindUniqueQuery = queryField('findUniquePackage', {
  type: 'Package',
  args: {
    where: nonNull('PackageWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.package.findUnique({
      where,
      ...select,
    })
  },
})
