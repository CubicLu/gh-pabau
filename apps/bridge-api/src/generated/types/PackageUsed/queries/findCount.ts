import { queryField, nonNull, list } from 'nexus'

export const PackageUsedFindCountQuery = queryField(
  'findManyPackageUsedCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'PackageUsedWhereInput',
      orderBy: list('PackageUsedOrderByWithRelationInput'),
      cursor: 'PackageUsedWhereUniqueInput',
      distinct: 'PackageUsedScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.packageUsed.count(args as any)
    },
  },
)
