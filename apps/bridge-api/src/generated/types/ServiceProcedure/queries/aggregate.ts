import { queryField, list } from 'nexus'

export const ServiceProcedureAggregateQuery = queryField(
  'aggregateServiceProcedure',
  {
    type: 'AggregateServiceProcedure',
    args: {
      where: 'ServiceProcedureWhereInput',
      orderBy: list('ServiceProcedureOrderByWithRelationInput'),
      cursor: 'ServiceProcedureWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceProcedure.aggregate({ ...args, ...select }) as any
    },
  },
)
