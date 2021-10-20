import { queryField, list } from 'nexus'

export const PackageFindFirstQuery = queryField('findFirstPackage', {
  type: 'Package',
  args: {
    where: 'PackageWhereInput',
    orderBy: list('PackageOrderByWithRelationInput'),
    cursor: 'PackageWhereUniqueInput',
    distinct: 'PackageScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.package.findFirst({
      ...args,
      ...select,
    })
  },
})
