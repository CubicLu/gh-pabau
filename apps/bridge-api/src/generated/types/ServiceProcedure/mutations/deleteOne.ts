import { mutationField, nonNull } from 'nexus'

export const ServiceProcedureDeleteOneMutation = mutationField(
  'deleteOneServiceProcedure',
  {
    type: 'ServiceProcedure',
    args: {
      where: nonNull('ServiceProcedureWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.serviceProcedure.delete({
        where,
        ...select,
      })
    },
  },
)
