import { mutationField, nonNull } from 'nexus'

export const ServiceCategoryUpdateOneMutation = mutationField(
  'updateOneServiceCategory',
  {
    type: nonNull('ServiceCategory'),
    args: {
      where: nonNull('ServiceCategoryWhereUniqueInput'),
      data: nonNull('ServiceCategoryUpdateInput'),
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
