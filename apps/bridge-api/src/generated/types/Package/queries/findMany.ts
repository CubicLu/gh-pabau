import { queryField, nonNull, list } from 'nexus'

export const PackageFindManyQuery = queryField('findManyPackage', {
  type: nonNull(list(nonNull('Package'))),
  args: {
    where: 'PackageWhereInput',
    orderBy: list('PackageOrderByInput'),
    cursor: 'PackageWhereUniqueInput',
    distinct: 'PackageScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.package.findMany({
      ...args,
      ...select,
    })
  },
})
