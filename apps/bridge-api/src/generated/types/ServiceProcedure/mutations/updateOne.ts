import { mutationField, nonNull } from 'nexus'

export const ServiceProcedureUpdateOneMutation = mutationField(
  'updateOneServiceProcedure',
  {
    type: nonNull('ServiceProcedure'),
    args: {
      data: nonNull('ServiceProcedureUpdateInput'),
      where: nonNull('ServiceProcedureWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.serviceProcedure.update({
        where,
        data,
        ...select,
      })
    },
  },
)
