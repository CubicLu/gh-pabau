import { queryField, nonNull } from 'nexus'

export const ServiceProcedureFindUniqueQuery = queryField(
  'findUniqueServiceProcedure',
  {
    type: 'ServiceProcedure',
    args: {
      where: nonNull('ServiceProcedureWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.serviceProcedure.findUnique({
        where,
        ...select,
      })
    },
  },
)
