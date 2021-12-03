import { queryField, nonNull, list } from 'nexus'

export const ContactPackageFindCountQuery = queryField(
  'findManyContactPackageCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ContactPackageWhereInput',
      orderBy: list('ContactPackageOrderByWithRelationInput'),
      cursor: 'ContactPackageWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ContactPackageScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactPackage.count(args as any)
    },
  },
)
