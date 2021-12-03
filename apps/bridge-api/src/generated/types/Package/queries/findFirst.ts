import { queryField, list } from 'nexus'

export const PackageFindFirstQuery = queryField('findFirstPackage', {
  type: 'Package',
  args: {
    where: 'PackageWhereInput',
    orderBy: list('PackageOrderByWithRelationInput'),
    cursor: 'PackageWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('PackageScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.package.findFirst({
      ...args,
      ...select,
    })
  },
})
