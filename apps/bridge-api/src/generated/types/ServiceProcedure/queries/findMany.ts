import { queryField, nonNull, list } from 'nexus'

export const ServiceProcedureFindManyQuery = queryField(
  'findManyServiceProcedure',
  {
    type: nonNull(list(nonNull('ServiceProcedure'))),
    args: {
      where: 'ServiceProcedureWhereInput',
      orderBy: list('ServiceProcedureOrderByWithRelationInput'),
      cursor: 'ServiceProcedureWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ServiceProcedureScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceProcedure.findMany({
        ...args,
        ...select,
      })
    },
  },
)
