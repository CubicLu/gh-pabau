import { mutationField, nonNull } from 'nexus'

export const ServiceProcedureCreateOneMutation = mutationField(
  'createOneServiceProcedure',
  {
    type: nonNull('ServiceProcedure'),
    args: {
      data: nonNull('ServiceProcedureCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.serviceProcedure.create({
        data,
        ...select,
      })
    },
  },
)
