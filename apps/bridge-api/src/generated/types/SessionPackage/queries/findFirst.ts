import { queryField, list } from 'nexus'

export const SessionPackageFindFirstQuery = queryField(
  'findFirstSessionPackage',
  {
    type: 'SessionPackage',
    args: {
      where: 'SessionPackageWhereInput',
      orderBy: list('SessionPackageOrderByInput'),
      cursor: 'SessionPackageWhereUniqueInput',
      distinct: 'SessionPackageScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.sessionPackage.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
