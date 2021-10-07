import { queryField, nonNull, list } from 'nexus'

export const ContactPackageFindManyQuery = queryField(
  'findManyContactPackage',
  {
    type: nonNull(list(nonNull('ContactPackage'))),
    args: {
      where: 'ContactPackageWhereInput',
      orderBy: list('ContactPackageOrderByWithRelationInput'),
      cursor: 'ContactPackageWhereUniqueInput',
      distinct: 'ContactPackageScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactPackage.findMany({
        ...args,
        ...select,
      })
    },
  },
)
