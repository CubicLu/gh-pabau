import { mutationField, nonNull } from 'nexus'

export const ServiceCategoryUpdateOneMutation = mutationField(
  'updateOneServiceCategory',
  {
    type: nonNull('ServiceCategory'),
    args: {
      data: nonNull('ServiceCategoryUpdateInput'),
      where: nonNull('ServiceCategoryWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.serviceCategory.update({
        where,
        data,
        ...select,
      })
    },
  },
)
