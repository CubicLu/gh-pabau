import { mutationField, nonNull } from 'nexus'

export const ServiceCategoryDeleteOneMutation = mutationField(
  'deleteOneServiceCategory',
  {
    type: 'ServiceCategory',
    args: {
      where: nonNull('ServiceCategoryWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.serviceCategory.delete({
        where,
        ...select,
      })
    },
  },
)
