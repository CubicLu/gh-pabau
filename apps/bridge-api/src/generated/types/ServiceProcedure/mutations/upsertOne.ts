import { mutationField, nonNull } from 'nexus'

export const ServiceProcedureUpsertOneMutation = mutationField(
  'upsertOneServiceProcedure',
  {
    type: nonNull('ServiceProcedure'),
    args: {
      where: nonNull('ServiceProcedureWhereUniqueInput'),
      create: nonNull('ServiceProcedureCreateInput'),
      update: nonNull('ServiceProcedureUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceProcedure.upsert({
        ...args,
        ...select,
      })
    },
  },
)
