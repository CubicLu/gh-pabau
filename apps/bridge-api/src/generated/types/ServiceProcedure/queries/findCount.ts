import { queryField, nonNull, list } from 'nexus'

export const ServiceProcedureFindCountQuery = queryField(
  'findManyServiceProcedureCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ServiceProcedureWhereInput',
      orderBy: list('ServiceProcedureOrderByWithRelationInput'),
      cursor: 'ServiceProcedureWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ServiceProcedureScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.serviceProcedure.count(args as any)
    },
  },
)
