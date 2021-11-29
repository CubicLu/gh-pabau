import { queryField, list } from 'nexus'

export const PackageUsedFindFirstQuery = queryField('findFirstPackageUsed', {
  type: 'PackageUsed',
  args: {
    where: 'PackageUsedWhereInput',
    orderBy: list('PackageUsedOrderByWithRelationInput'),
    cursor: 'PackageUsedWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('PackageUsedScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.packageUsed.findFirst({
      ...args,
      ...select,
    })
  },
})
