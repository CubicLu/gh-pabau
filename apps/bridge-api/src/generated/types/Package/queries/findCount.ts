import { queryField, nonNull, list } from 'nexus'

export const PackageFindCountQuery = queryField('findManyPackageCount', {
  type: nonNull('Int'),
  args: {
    where: 'PackageWhereInput',
    orderBy: list('PackageOrderByWithRelationInput'),
    cursor: 'PackageWhereUniqueInput',
    distinct: 'PackageScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.package.count(args as any)
  },
})
