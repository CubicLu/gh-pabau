import { queryField, list } from 'nexus'

export const CmContactCustomAggregateQuery = queryField(
  'aggregateCmContactCustom',
  {
    type: 'AggregateCmContactCustom',
    args: {
      where: 'CmContactCustomWhereInput',
      orderBy: list('CmContactCustomOrderByInput'),
      cursor: 'CmContactCustomWhereUniqueInput',
      distinct: 'CmContactCustomScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactCustom.aggregate({ ...args, ...select }) as any
    },
  },
)
