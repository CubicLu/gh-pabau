import { queryField, list } from 'nexus'

export const CmContactAlertAggregateQuery = queryField(
  'aggregateCmContactAlert',
  {
    type: 'AggregateCmContactAlert',
    args: {
      where: 'CmContactAlertWhereInput',
      orderBy: list('CmContactAlertOrderByInput'),
      cursor: 'CmContactAlertWhereUniqueInput',
      distinct: 'CmContactAlertScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactAlert.aggregate({ ...args, ...select }) as any
    },
  },
)
