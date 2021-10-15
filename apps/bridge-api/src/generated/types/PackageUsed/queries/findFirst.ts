import { queryField, list } from 'nexus'

export const PackageUsedFindFirstQuery = queryField('findFirstPackageUsed', {
  type: 'PackageUsed',
  args: {
    where: 'PackageUsedWhereInput',
    orderBy: list('PackageUsedOrderByInput'),
    cursor: 'PackageUsedWhereUniqueInput',
    distinct: 'PackageUsedScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.packageUsed.findFirst({
      ...args,
      ...select,
    })
  },
})
