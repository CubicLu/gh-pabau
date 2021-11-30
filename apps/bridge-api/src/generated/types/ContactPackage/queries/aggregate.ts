import { queryField, list } from 'nexus'

export const ContactPackageAggregateQuery = queryField(
  'aggregateContactPackage',
  {
    type: 'AggregateContactPackage',
    args: {
      where: 'ContactPackageWhereInput',
      orderBy: list('ContactPackageOrderByWithRelationInput'),
      cursor: 'ContactPackageWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactPackage.aggregate({ ...args, ...select }) as any
    },
  },
)
