import { queryField, list } from 'nexus'

export const ContactPackageAggregateQuery = queryField(
  'aggregateContactPackage',
  {
    type: 'AggregateContactPackage',
    args: {
      where: 'ContactPackageWhereInput',
      orderBy: list('ContactPackageOrderByInput'),
      cursor: 'ContactPackageWhereUniqueInput',
      distinct: 'ContactPackageScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactPackage.aggregate({ ...args, ...select }) as any
    },
  },
)
