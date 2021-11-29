import { queryField, nonNull, list } from 'nexus'

export const PackageUsedFindManyQuery = queryField('findManyPackageUsed', {
  type: nonNull(list(nonNull('PackageUsed'))),
  args: {
    where: 'PackageUsedWhereInput',
    orderBy: list('PackageUsedOrderByWithRelationInput'),
    cursor: 'PackageUsedWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('PackageUsedScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.packageUsed.findMany({
      ...args,
      ...select,
    })
  },
})
