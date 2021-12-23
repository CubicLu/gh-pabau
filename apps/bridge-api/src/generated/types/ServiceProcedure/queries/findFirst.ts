import { queryField, list } from 'nexus'

export const ServiceProcedureFindFirstQuery = queryField(
  'findFirstServiceProcedure',
  {
    type: 'ServiceProcedure',
    args: {
      where: 'ServiceProcedureWhereInput',
      orderBy: list('ServiceProcedureOrderByWithRelationInput'),
      cursor: 'ServiceProcedureWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ServiceProcedureScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceProcedure.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
