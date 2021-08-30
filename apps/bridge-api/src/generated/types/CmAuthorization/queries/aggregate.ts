import { queryField, list } from 'nexus'

export const CmAuthorizationAggregateQuery = queryField(
  'aggregateCmAuthorization',
  {
    type: 'AggregateCmAuthorization',
    args: {
      where: 'CmAuthorizationWhereInput',
      orderBy: list('CmAuthorizationOrderByInput'),
      cursor: 'CmAuthorizationWhereUniqueInput',
      distinct: 'CmAuthorizationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmAuthorization.aggregate({ ...args, ...select }) as any
    },
  },
)
