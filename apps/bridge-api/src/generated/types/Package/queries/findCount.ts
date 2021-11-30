import { queryField, nonNull, list } from 'nexus'

export const PackageFindCountQuery = queryField('findManyPackageCount', {
  type: nonNull('Int'),
  args: {
    where: 'PackageWhereInput',
    orderBy: list('PackageOrderByWithRelationInput'),
    cursor: 'PackageWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('PackageScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.package.count(args as any)
  },
})
