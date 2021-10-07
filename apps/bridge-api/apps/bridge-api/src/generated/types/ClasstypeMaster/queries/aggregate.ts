import { queryField, list } from 'nexus'

export const ClasstypeMasterAggregateQuery = queryField(
  'aggregateClasstypeMaster',
  {
    type: 'AggregateClasstypeMaster',
    args: {
      where: 'ClasstypeMasterWhereInput',
      orderBy: list('ClasstypeMasterOrderByWithRelationInput'),
      cursor: 'ClasstypeMasterWhereUniqueInput',
      distinct: 'ClasstypeMasterScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.classtypeMaster.aggregate({ ...args, ...select }) as any
    },
  },
)
