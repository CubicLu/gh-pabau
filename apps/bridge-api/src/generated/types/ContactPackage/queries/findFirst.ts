import { queryField, list } from 'nexus'

export const ContactPackageFindFirstQuery = queryField(
  'findFirstContactPackage',
  {
    type: 'ContactPackage',
    args: {
      where: 'ContactPackageWhereInput',
      orderBy: list('ContactPackageOrderByInput'),
      cursor: 'ContactPackageWhereUniqueInput',
      distinct: 'ContactPackageScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactPackage.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
