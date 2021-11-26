import { queryField, nonNull, list } from 'nexus'

export const PackageUsedFindCountQuery = queryField(
  'findManyPackageUsedCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'PackageUsedWhereInput',
      orderBy: list('PackageUsedOrderByWithRelationInput'),
      cursor: 'PackageUsedWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('PackageUsedScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.packageUsed.count(args as any)
    },
  },
)
