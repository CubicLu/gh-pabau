import { queryField, list } from 'nexus'

export const ContactPackageFindFirstQuery = queryField(
  'findFirstContactPackage',
  {
    type: 'ContactPackage',
    args: {
      where: 'ContactPackageWhereInput',
      orderBy: list('ContactPackageOrderByWithRelationInput'),
      cursor: 'ContactPackageWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ContactPackageScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactPackage.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
