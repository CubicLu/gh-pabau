import { queryField, nonNull, list } from 'nexus'

export const SessionPackageFindManyQuery = queryField(
  'findManySessionPackage',
  {
    type: nonNull(list(nonNull('SessionPackage'))),
    args: {
      where: 'SessionPackageWhereInput',
      orderBy: list('SessionPackageOrderByInput'),
      cursor: 'SessionPackageWhereUniqueInput',
      distinct: 'SessionPackageScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.sessionPackage.findMany({
        ...args,
        ...select,
      })
    },
  },
)
