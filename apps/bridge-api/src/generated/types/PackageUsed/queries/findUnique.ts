import { queryField, nonNull } from 'nexus'

export const PackageUsedFindUniqueQuery = queryField('findUniquePackageUsed', {
  type: 'PackageUsed',
  args: {
    where: nonNull('PackageUsedWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.packageUsed.findUnique({
      where,
      ...select,
    })
  },
})
