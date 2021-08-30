import { queryField, nonNull, list } from 'nexus'

export const SessionPackageFindCountQuery = queryField(
  'findManySessionPackageCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'SessionPackageWhereInput',
      orderBy: list('SessionPackageOrderByInput'),
      cursor: 'SessionPackageWhereUniqueInput',
      distinct: 'SessionPackageScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.sessionPackage.count(args as any)
    },
  },
)
