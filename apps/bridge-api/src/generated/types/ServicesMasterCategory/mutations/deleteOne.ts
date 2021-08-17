import { mutationField, nonNull } from 'nexus'

export const ServicesMasterCategoryDeleteOneMutation = mutationField(
  'deleteOneServicesMasterCategory',
  {
    type: 'ServicesMasterCategory',
    args: {
      where: nonNull('ServicesMasterCategoryWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.servicesMasterCategory.delete({
        where,
        ...select,
      })
    },
  },
)
