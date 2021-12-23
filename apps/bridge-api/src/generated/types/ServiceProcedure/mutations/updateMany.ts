import { mutationField, nonNull } from 'nexus'

export const ServiceProcedureUpdateManyMutation = mutationField(
  'updateManyServiceProcedure',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ServiceProcedureUpdateManyMutationInput'),
      where: 'ServiceProcedureWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.serviceProcedure.updateMany(args as any)
    },
  },
)
